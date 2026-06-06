// Script para inspeccionar la estructura de las tablas en SQL Server
import mssql from 'mssql';

const config = {
  user: 'analista_cif',
  password: 'Royal2025',
  server: 'localhost',
  database: 'RoyalCIF',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function inspectTables() {
  let pool;
  try {
    pool = await mssql.connect(config);
    console.log('✅ Conectado.\n');

    // Ver columnas de tabla users
    const usersSchema = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'users' ORDER BY ORDINAL_POSITION
    `);
    console.log('📋 Tabla: users');
    usersSchema.recordset.forEach(c => console.log(`  - ${c.COLUMN_NAME} (${c.DATA_TYPE})`));

    // Ver columnas de tabla profiles
    const profilesSchema = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'profiles' ORDER BY ORDINAL_POSITION
    `);
    console.log('\n📋 Tabla: profiles');
    profilesSchema.recordset.forEach(c => console.log(`  - ${c.COLUMN_NAME} (${c.DATA_TYPE})`));

    // Ver columnas de tabla user_roles
    const rolesSchema = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'user_roles' ORDER BY ORDINAL_POSITION
    `);
    console.log('\n📋 Tabla: user_roles');
    rolesSchema.recordset.forEach(c => console.log(`  - ${c.COLUMN_NAME} (${c.DATA_TYPE})`));

    // Ver todos los usuarios existentes
    const users = await pool.request().query('SELECT email FROM users');
    console.log('\n👥 Usuarios existentes:');
    users.recordset.forEach(u => console.log(`  - ${u.email}`));

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    if (pool) await pool.close();
  }
}

inspectTables();
