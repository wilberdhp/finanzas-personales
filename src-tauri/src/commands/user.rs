use crate::security;
use crate::state::AppState;
use crate::models::user as us;
use argon2::PasswordVerifier;
use argon2::password_hash::PasswordHash;
use serde::Serialize;


async fn rehash_password(
  state: tauri::State<'_, AppState>,
  id_user: &String,
  password: String
) -> Result<(), String> {
  let new_hash = security::password::hash_password(&password)
      .map_err(|_| "Error de seguridad".to_string())?;
  
  us::update_password(state.pool(), &id_user, &new_hash)
      .await
      .map_err(|_| "Error de seguridad".to_string())?;

  Ok(())
}

#[derive(Debug, Clone, Serialize)]
pub struct UserLogged {
  id_user: String,
  username: String
}

/// Comparar password ingresado por el usuario con el hash account.password guardado en la base de datos en formato de texto. Si los datos son correctos devolver el id de usuario en account.id_user. Si los datos son incorrectos devolver un error
#[tauri::command]
pub async fn login(
    state: tauri::State<'_, AppState>,
    username: String,
    password: String,
) -> Result<UserLogged, String> {

    let username = username.trim();

    if username.len() < 3 || password.len() < 8 {
        return Err("Credenciales inválidas".to_string());
    }

    let account = us::get_user(state.pool(), username)
        .await
        .map_err(|_| "Credenciales inválidas".to_string())?;

    let parsed_hash = PasswordHash::new(&account.password)
        .map_err(|_| "Credenciales inválidas".to_string())?;

    let argon2 = security::password::argon2_config();

    if argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_err()
    {
        return Err("Credenciales inválidas".to_string());
    }

    if security::password::needs_rehash(&parsed_hash, &argon2) {
        rehash_password(
            state,
            &account.id_user,
            password,
        )
        .await
        .map_err(|_| {
            "No se pudo actualizar la seguridad de la cuenta. Intente más tarde."
                .to_string()
        })?;
    }

    Ok(UserLogged {
        id_user: account.id_user,
        username: username.to_string(),
    })
}


/// Se verifica que no exista ninguna cuenta con ese username. Si existe devolver un error. Si no existe ningún usuario proceder a guardarlo en la base de datos y devolver el id
#[tauri::command]
pub async fn signup(
    state: tauri::State<'_, AppState>,
    username: String,
    password: String,
) -> Result<UserLogged, String> {

    let username = username.trim();

    if username.is_empty() {
        return Err("El nombre de usuario no puede estar vacío.".to_string());
    }

    if username.len() < 3 {
        return Err("El nombre de usuario debe tener al menos 3 caracteres.".to_string());
    }

    if username.len() > 30 {
        return Err("El nombre de usuario no puede superar los 30 caracteres.".to_string());
    }

    if password.len() < 8 {
        return Err("La contraseña debe tener al menos 8 caracteres.".to_string());
    }

    if password.len() > 128 {
        return Err("La contraseña es demasiado larga.".to_string());
    }

    let exists = us::find_user_to_verification(state.pool(), &username)
        .await
        .map_err(|_| {
            "No se pudo validar el nombre de usuario. Intente nuevamente más tarde."
                .to_string()
        })?
        .is_some();

    if exists {
        return Err("El nombre de usuario ya está en uso.".to_string());
    }

    let password_hash = security::password::hash_password(&password)
        .map_err(|_| "No se pudo procesar la contraseña.".to_string())?;

    let id_user = us::insert(state.pool(), &username, &password_hash)
        .await
        .map_err(|_| {
            "No se pudo registrar el usuario. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(UserLogged {
        id_user,
        username: username.to_string(),
    })
}

#[tauri::command]
pub async fn change_username(
    state: tauri::State<'_, AppState>,
    id_user: String,
    new_username: String,
) -> Result<String, String> {

    let username = new_username.trim();

    if username.is_empty() {
        return Err("El nombre de usuario no puede estar vacío.".to_string());
    }

    if username.len() < 3 {
        return Err("El nombre de usuario debe tener al menos 3 caracteres.".to_string());
    }

    if username.len() > 30 {
        return Err("El nombre de usuario no puede superar los 30 caracteres.".to_string());
    }

    let exists = us::find_user_to_verification(state.pool(), &username)
        .await
        .map_err(|_| {
            "No se pudo validar el nombre de usuario. Intente nuevamente más tarde."
                .to_string()
        })?
        .is_some();

    if exists {
        return Err("El nombre de usuario ya está en uso. Elija otro distinto.".to_string());
    }

    us::update_username(
        state.pool(),
        &id_user,
        username,
    )
    .await
    .map_err(|_| {
        "No se pudo actualizar el nombre de usuario. Intente nuevamente más tarde."
            .to_string()
    })?;

    Ok(username.to_string())
}

#[tauri::command]
pub async fn change_password(
  state: tauri::State<'_, AppState>,
  id_user: String,
  current_password: String,
  new_password: String,
  confirm_new_password: String
) -> Result<(), String> {

  const INVALID_CREDENTIALS: &str = "Credenciales inválidas";

  let account_password = us::find_user_to_verification_password(state.pool(), &id_user)
    .await
    .map_err(|_| INVALID_CREDENTIALS.to_string())?;

  let parsed_hash = PasswordHash::new(&account_password)
    .map_err(|_| INVALID_CREDENTIALS.to_string())?;

  let argon2 = security::password::argon2_config();

  argon2
    .verify_password(current_password.as_bytes(), &parsed_hash)
    .map_err(|_| INVALID_CREDENTIALS.to_string())?;


  if new_password.len() < 8 {
    return Err("La contraseña debe tener al menos 8 caracteres".to_string());
  }

  if new_password != confirm_new_password {
    return Err("Las contraseñas no coinciden".to_string());
  }
        
  if argon2
    .verify_password(new_password.as_bytes(), &parsed_hash)
    .is_ok()
  {
    return Err("La nueva contraseña no puede ser igual a la anterior".to_string());
  }

  rehash_password(
    state, 
    &id_user,
    new_password
  )
  .await
  .map_err(|_| "Error al actualizar la contraseña".to_string())?;

  Ok(())
}


#[tauri::command]
pub async fn delete_user(
    state: tauri::State<'_, AppState>,
    id_user: String,
) -> Result<(), String> {

    let id_user = id_user.trim();

    if id_user.is_empty() {
        return Err("Usuario inválido.".to_string());
    }

    us::delete(state.pool(), id_user)
        .await
        .map_err(|_| {
            "No se pudo eliminar el usuario. Intente nuevamente más tarde."
                .to_string()
        })?;

    Ok(())
}
