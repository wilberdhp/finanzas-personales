use argon2::{
    password_hash::{PasswordHasher, SaltString},
    Argon2, PasswordHash, Params
};
use rand_core::OsRng;

pub fn argon2_config() -> Argon2<'static> {
    let params = Params::new(
        19456, // memoria (KB)
        3,     // iteraciones
        1,     // paralelismo
        None,
    ).expect("Parámetros Argon2 inválidos");

    Argon2::new(
        argon2::Algorithm::Argon2id,
        argon2::Version::V0x13,
        params,
    )
}

pub fn hash_password(password: &str) -> Result<String, argon2::password_hash::Error> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = argon2_config();

    let password_hash = argon2.hash_password(password.as_bytes(), &salt)?;
    
    Ok(password_hash.to_string())
}

pub fn needs_rehash(parsed_hash: &PasswordHash, argon2: &Argon2) -> bool {
    let params = argon2.params();

    let m_current = params.m_cost();
    let t_current = params.t_cost();
    let p_current = params.p_cost();

    let m_hash = parsed_hash.params.get("m").and_then(|v| v.decimal().ok()).unwrap_or(0);
    let t_hash = parsed_hash.params.get("t").and_then(|v| v.decimal().ok()).unwrap_or(0);
    let p_hash = parsed_hash.params.get("p").and_then(|v| v.decimal().ok()).unwrap_or(0);

    m_hash != m_current || t_hash != t_current || p_hash != p_current
}
