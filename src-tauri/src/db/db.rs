use argon2::{
  Argon2,
  password_hash::{PasswordHasher, SaltString},
};

use hex;
use rand::rngs::OsRng;
use secrecy::{ExposeSecret, SecretString};
use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};
use tauri::Manager;
use std::{fs, path::PathBuf};
use zeroize::Zeroize;

/// Derivar la clave
fn derive_key(master_password: &SecretString, salt: &SaltString) -> Vec<u8> {
  let argon2 = Argon2::default();
  let hash = argon2
      .hash_password(master_password.expose_secret().as_bytes(), salt)
      .expect("Error derivando clave");

  hash.hash.unwrap().as_bytes().to_vec()
}

/// Iniciar la conexión con la base de datos
pub async fn init_db(app: &tauri::AppHandle, master_password: SecretString) -> SqlitePool {
  // Resolver %APPDATA%
  let appdata = app.path()
    .app_data_dir()
    .expect("No se pudo resolver app_data_dir");
    
  let db_dir = PathBuf::from(appdata).join("Personal Finances").join("database");
  fs::create_dir_all(&db_dir).expect("No se pudo crear el directorio");

  // Ruta de base de datos y salt
  let db_path = db_dir.join("Database.db");
  let salt_path = db_dir.join("salt.bin");

  // Crear la DB si no existe
  if !db_path.exists() {
    fs::File::create(&db_path).expect("No se pudo crear el archivo de base de datos");
  }

  // Crear/leer salt para derivar clave
  let salt: SaltString = if salt_path.exists() {
    let b64 = fs::read_to_string(&salt_path).expect("No se pudo leer el salt");
    SaltString::from_b64(&b64).expect("Salt inválido")
  } else {
    let salt = SaltString::generate(&mut OsRng);
    fs::write(&salt_path, salt.as_str()).expect("No se pudo guardar el salt");
    salt
  };

  let mut key_bytes = derive_key(&master_password, &salt);
  let key_hex = hex::encode(&key_bytes);

  #[cfg(debug_assertions)]
  println!("SQLCipher key (DEBUG): {}", key_hex);

  let database_url = format!("sqlite://{}", db_path.display());

  #[cfg(debug_assertions)]
  println!("DataBase URL (DEBUG): {}", database_url);

  // Conectar
  let pool = SqlitePoolOptions::new()
      .max_connections(1)
      .connect(&database_url)
      .await
      .expect("Clave incorrecta");

  // Aplicar clave SQLCipher
  sqlx::query(&format!("PRAGMA key = \"x'{}'\";", key_hex))
    .execute(&pool)
    .await
    .expect("Clave incorrecta");

  // PRAGMAs de conexión
  sqlx::query("PRAGMA cipher_memory_security = ON;")
      .execute(&pool)
      .await
      .unwrap();

  sqlx::query("PRAGMA foreign_keys = ON;")
      .execute(&pool)
      .await
      .unwrap();
  
  // Validar clave
  if sqlx::query("SELECT count(*) FROM sqlite_master;")
      .fetch_one(&pool)
      .await
      .is_err()
  {
    panic!("Contraseña incorrecta");
  }

  // Verificar si la DB ya fue creada
  let user_version: i64 = sqlx::query_scalar("PRAGMA user_version;")
      .fetch_one(&pool)
      .await
      .unwrap();

  if user_version == 0 {
    // PRAGMAs persistentes (solo una vez)
    sqlx::query("PRAGMA journal_mode = WAL;").execute(&pool).await.unwrap();
    sqlx::query("PRAGMA secure_delete = ON;").execute(&pool).await.unwrap();

    sqlx::query(
      r#"
      CREATE TABLE IF NOT EXISTS "Expense_Category" (
        "id_category"	INTEGER NOT NULL,
        "category"	TEXT NOT NULL,
        PRIMARY KEY("id_category" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Payment_Type" (
        "id_payment_type"	INTEGER NOT NULL,
        "type"	INTEGER NOT NULL,
        PRIMARY KEY("id_payment_type" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Risk" (
        "id_risk"	INTEGER NOT NULL,
        "risk"	TEXT NOT NULL,
        PRIMARY KEY("id_risk" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Type_Debt" (
        "id_type_debt"	INTEGER NOT NULL,
        "type"	INTEGER NOT NULL,
        PRIMARY KEY("id_type_debt" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Type_Income" (
        "id_type_income"	INTEGER NOT NULL,
        "type"	TEXT NOT NULL,
        PRIMARY KEY("id_type_income" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "Type_Investment" (
        "id_type_investment"	INTEGER NOT NULL,
        "type"	TEXT,
        PRIMARY KEY("id_type_investment" AUTOINCREMENT)
      );

      CREATE TABLE IF NOT EXISTS "User" (
        "id_user"	TEXT NOT NULL UNIQUE,
        "username"	TEXT NOT NULL UNIQUE,
        "password"	TEXT NOT NULL,
        PRIMARY KEY("id_user")
      );

      CREATE TABLE IF NOT EXISTS "Account" (
        "id_account"	INTEGER NOT NULL,
        "id_user"	TEXT NOT NULL,
        "name"	TEXT NOT NULL,
        "porcentage"	REAL NOT NULL DEFAULT 0,
        "amount"	REAL NOT NULL DEFAULT 0,
        "color"	TEXT NOT NULL,
        PRIMARY KEY("id_account" AUTOINCREMENT),
        FOREIGN KEY("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Debt" (
        "id_debt"	INTEGER NOT NULL,
        "id_account"	INTEGER NOT NULL,
        "creditor"	TEXT NOT NULL,
        "paid"	INTEGER NOT NULL DEFAULT 0,
        "interestRate"	REAL NOT NULL DEFAULT 0,
        "start_date"	INTEGER NOT NULL,
        "end_date"	INTEGER NOT NULL,
        "total_amount"	REAL NOT NULL,
        "rest_amount"	REAL NOT NULL,
        "id_payment_type"	INTEGER NOT NULL,
        "id_type_debt"	INTEGER NOT NULL,
        PRIMARY KEY("id_debt" AUTOINCREMENT),
        FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
        FOREIGN KEY("id_payment_type") REFERENCES "Payment_Type"("id_payment_type") ON DELETE CASCADE,
        FOREIGN KEY("id_type_debt") REFERENCES "Type_Debt"("id_type_debt") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Expense" (
        "id_expense"	INTEGER NOT NULL,
        "id_account"	INTEGER NOT NULL,
        "id_gasto_mensual"	INTEGER,
        "date"	TEXT NOT NULL,
        "description"	TEXT NOT NULL,
        "amount"	REAL NOT NULL DEFAULT 0,
        "id_category"	INTEGER NOT NULL,
        PRIMARY KEY("id_expense" AUTOINCREMENT),
        FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
        FOREIGN KEY("id_category") REFERENCES "Expense_Category"("id_category") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Income" (
        "id_income"	INTEGER NOT NULL,
        "date"	INTEGER NOT NULL,
        "description"	TEXT NOT NULL,
        "amount"	REAL NOT NULL DEFAULT 0,
        "id_type_income"	INTEGER NOT NULL,
        PRIMARY KEY("id_income" AUTOINCREMENT),
        FOREIGN KEY("id_type_income") REFERENCES "Type_Income"("id_type_income") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Income_Account" (
        "id"	INTEGER NOT NULL,
        "id_account"	INTEGER NOT NULL,
        "id_income"	INTEGER NOT NULL,
        "amount"	REAL NOT NULL DEFAULT 0,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
        FOREIGN KEY("id_income") REFERENCES "Income"("id_income") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Investment" (
        "id_investment"	INTEGER NOT NULL,
        "id_account"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "amount"	REAL NOT NULL DEFAULT 0,
        "expected_return"	REAL NOT NULL DEFAULT 0,
        "start_date"	INTEGER NOT NULL,
        "end_date"	INTEGER NOT NULL,
        "status"	TEXT NOT NULL,
        "id_risk"	INTEGER NOT NULL,
        "id_type_investment"	INTEGER NOT NULL,
        PRIMARY KEY("id_investment" AUTOINCREMENT),
        FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
        FOREIGN KEY("id_risk") REFERENCES "Risk"("id_risk") ON DELETE CASCADE,
        FOREIGN KEY("id_type_investment") REFERENCES "Type_Investment"("id_type_investment") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Monthly_Expense" (
        "id_monthly_expense"	INTEGER NOT NULL,
        "id_account"	INTEGER NOT NULL,
        "description"	TEXT NOT NULL,
        "payment_day"	INTEGER NOT NULL,
        "status"	TEXT NOT NULL,
        PRIMARY KEY("id_monthly_expense" AUTOINCREMENT),
        FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE
      );   
      "#
    )
    .execute(&pool)
    .await
    .unwrap();

    println!("Tablas creadas");

    sqlx::query("PRAGMA user_version = 1;")
        .execute(&pool)
        .await
        .unwrap();
  }

  key_bytes.zeroize();

  pool

}