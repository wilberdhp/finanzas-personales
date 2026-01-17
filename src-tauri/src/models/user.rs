use sqlx::{SqlitePool, Error, FromRow};
use uuid::Uuid;
use serde::Serialize;

#[derive(Debug, Serialize, FromRow)]
pub struct UserDto {
    pub id_user: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize, FromRow)]
pub struct UserVerification {
    pub username: String,
}

#[derive(Debug, Serialize, FromRow)]
pub struct UserVerificationPassword {
    pub password: String,
}



pub async fn get_user(
    pool: &SqlitePool,
    username: &str,
) -> Result<UserDto, Error> {
    let account = sqlx::query_as::<_, UserDto>(
        r#"
        SELECT
            id_user,
            username,
            password
        FROM User
        WHERE username = ?;
        "#
    )
    .bind(username)
    .fetch_one(pool)
    .await?;

    Ok(account)
}

pub async fn find_user_to_verification(
    pool: &SqlitePool,
    username: &str,
) -> Result<Option<UserVerification>, Error> {
    let account = sqlx::query_as::<_, UserVerification>(
        r#"
        SELECT
            username
        FROM User
        WHERE username = ?;
        "#
    )
    .bind(username)
    .fetch_one(pool)
    .await;

    match account {
      Ok(account) => Ok(Some(account)),
      Err(sqlx::Error::RowNotFound) => Ok(None),
      Err(e) => Err(e),
    }
}

pub async fn find_user_to_verification_password(
    pool: &SqlitePool,
    id_user: &str,
) -> Result<String, Error> {
    let account = sqlx::query_as::<_, UserVerificationPassword>(
        r#"
        SELECT
            password
        FROM User
        WHERE id_user = ?;
        "#
    )
    .bind(id_user)
    .fetch_one(pool)
    .await?;

    Ok(account.password)
}


pub async fn insert(pool: &SqlitePool, username: &str, password: &str) -> Result<String, Error> {
    let id_user = Uuid::new_v4().to_string();
  
    sqlx::query(
      r#"
      INSERT INTO 
        User (id_user, username, password)
        VALUES (?, ?, ?)
      "#
    )
    .bind(&id_user)
    .bind(username)
    .bind(password)
    .execute(pool)
    .await?;

    Ok(id_user)
}

pub async fn update_username(pool: &SqlitePool, id_user: &str, username: &str) -> Result<(), Error> {
  sqlx::query(
    r#"
    UPDATE User 
      SET username = ?
    WHERE id_user = ?;
    "#
  )
  .bind(username)
  .bind(id_user)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn update_password(pool: &SqlitePool, id_user: &str,password: &str) -> Result<(), Error> {
  sqlx::query(
    r#"
    UPDATE User 
      SET password = ?
    WHERE id_user = ?;
    "#
  )
  .bind(password)
  .bind(id_user)
  .execute(pool)
  .await?;

  Ok(())
}

pub async fn delete(pool: &SqlitePool, id_user: &str) -> Result<(), Error> {
  sqlx::query(
    "DELETE FROM User WHERE id_user = ?;"
  )
  .bind(id_user)
  .execute(pool)
  .await?;

  Ok(())
}