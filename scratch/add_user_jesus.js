// Actualizar contraseña del Lic. Jesús y asignarle rol admin
import mssql from 'mssql';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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

async function updateUser() {
  let pool;
  try {
    pool = await mssql.connect(config);
    console.log('✅ Conectado a SQL Server.\n');

    const email = 'jesus@royaltransports.com.mx';
    const password = '@Jsanchez546';
    const fullName = 'Jesús Sánchez';

    // 1. Obtener el ID del usuario
    const userRes = await pool.request()
      .input('email', mssql.NVarChar, email)
      .query('SELECT id FROM users WHERE email = @email');

    if (userRes.recordset.length === 0) {
      // Crear usuario si no existe
      const userId = crypto.randomUUID();
      const hash = await bcrypt.hash(password, 10);
      await pool.request()
        .input('id', mssql.UniqueIdentifier, userId)
        .input('email', mssql.NVarChar, email)
        .input('hash', mssql.NVarChar, hash)
        .query('INSERT INTO users (id, email, password_hash) VALUES (@id, @email, @hash)');
      console.log(`✅ Usuario creado: ${email}`);
    } else {
      // Actualizar contraseña
      const hash = await bcrypt.hash(password, 10);
      await pool.request()
        .input('email', mssql.NVarChar, email)
        .input('hash', mssql.NVarChar, hash)
        .query('UPDATE users SET password_hash = @hash WHERE email = @email');
      console.log(`✅ Contraseña actualizada para: ${email}`);
    }

    // 2. Obtener el ID actualizado
    const idRes = await pool.request()
      .input('email', mssql.NVarChar, email)
      .query('SELECT id FROM users WHERE email = @email');
    const userId = idRes.recordset[0].id;

    // 3. Actualizar o insertar perfil (sin columna 'role')
    const profileExists = await pool.request()
      .input('id', mssql.UniqueIdentifier, userId)
      .query('SELECT id FROM profiles WHERE id = @id');

    if (profileExists.recordset.length > 0) {
      await pool.request()
        .input('id', mssql.UniqueIdentifier, userId)
        .input('fullName', mssql.NVarChar, fullName)
        .query('UPDATE profiles SET full_name = @fullName WHERE id = @id');
      console.log(`✅ Perfil actualizado: ${fullName}`);
    } else {
      await pool.request()
        .input('id', mssql.UniqueIdentifier, userId)
        .input('email', mssql.NVarChar, email)
        .input('fullName', mssql.NVarChar, fullName)
        .query('INSERT INTO profiles (id, email, full_name) VALUES (@id, @email, @fullName)');
      console.log(`✅ Perfil creado: ${fullName}`);
    }

    // 4. Asignar rol de admin en user_roles
    const roleExists = await pool.request()
      .input('userId', mssql.UniqueIdentifier, userId)
      .query("SELECT id FROM user_roles WHERE user_id = @userId AND role = 'admin'");

    if (roleExists.recordset.length === 0) {
      const roleId = crypto.randomUUID();
      await pool.request()
        .input('id', mssql.UniqueIdentifier, roleId)
        .input('userId', mssql.UniqueIdentifier, userId)
        .query("INSERT INTO user_roles (id, user_id, role) VALUES (@id, @userId, 'admin')");
      console.log(`✅ Rol admin asignado.`);
    } else {
      console.log(`ℹ️ Ya tenía rol admin.`);
    }

    console.log(`\n🎉 Usuario listo para usar:`);
    console.log(`   Correo:     ${email}`);
    console.log(`   Contraseña: ${password}`);
    console.log(`   Nombre:     ${fullName}`);
    console.log(`   Rol:        admin`);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    if (pool) await pool.close();
    console.log('\n🔒 Conexión cerrada.');
  }
}

updateUser();
