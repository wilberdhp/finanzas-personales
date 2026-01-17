use sqlx::SqlitePool;

pub struct AppState {
    pool: SqlitePool, // privado
}

impl AppState {

  pub fn new(pool: SqlitePool) -> Self {
    Self { pool }
  }

  // getter público para acceder al pool
  pub fn pool(&self) -> &SqlitePool {
    &self.pool
  }
}
