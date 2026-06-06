import mssql from "mssql";

const config: mssql.config = {
  user: process.env.DB_USER || "analista_cif",
  password: process.env.DB_PASSWORD || "Royal2025",
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_DATABASE || "RoyalCIF",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let poolPromise: Promise<mssql.ConnectionPool> | null = null;

export function getDbConnection(): Promise<mssql.ConnectionPool> {
  if (!poolPromise) {
    poolPromise = mssql.connect(config).then((pool) => {
      console.log("⚡ Conectado a la base de datos SQL Server");
      return pool;
    }).catch((err) => {
      console.error("❌ Falló la conexión a SQL Server:", err.message);
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}
