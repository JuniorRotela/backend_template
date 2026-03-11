// // services/login/login.services.ts

// import { getConnection } from "typeorm";
// import bcrypt from 'bcrypt';
// import { AppDataSource } from "../../db";

// interface UserData {
//   username: string;
//   password: string;
// }

// interface VerifyUserResult {
//   isValid: boolean;
//   id?: number;
//   username?: string;
//   id_level?: number;
//   id_horarios?: number;
//   id_sucursal?: number;
//   llave?: number;

// }

// export const verifyUser = async (tableName: string, data: UserData): Promise<VerifyUserResult> => {
//   const { username, password } = data;

//   try {
//     // Obtiene la conexión actual
//     const connection = getConnection();

//     // Ejecuta la consulta SQL para obtener el registro del usuario por nombre de usuario
//     const result = await connection.query(`SELECT * FROM ${tableName} WHERE status_active = 1 AND username = ?`, [username]);

//     if (result && result.length > 0) {
//       const user = result[0];
      
//       // Compara la contraseña proporcionada con la contraseña hasheada almacenada
//       const match = await bcrypt.compare(password, user.password);

//       if (match) {
//         // Devuelve el nivel del usuario, id y nombre de usuario si las credenciales son correctas
//         return { isValid: true, id: user.id, username: user.username,  id_level: user.id_level, id_sucursal: user.id_sucursal};
//       } else {
//         return { isValid: false }; // La contraseña no coincide
//       }
//     } else {
//       return { isValid: false }; // El usuario no existe
//     }
//   } catch (error) {
//     console.error("Error verifying user:", error);
//     throw error;
//   }
// };
import bcrypt from "bcrypt";
import { AppDataSource } from "../../db";

interface UserData {
  username: string;
  password: string;
}

interface VerifyUserResult {
  isValid: boolean;
  id?: number;
  username?: string;
  id_level?: number;
  id_sucursal?: number;
}

export const verifyUser = async (
  tableName: string,
  data: UserData
): Promise<VerifyUserResult> => {
  const { username, password } = data;
console.log("contraseña recibida user with username:", password); // Agrega este log para verificar el nombre de usuario recibido
  try {

    const result = await AppDataSource.query(
      `SELECT * FROM ${tableName} WHERE status_active = 1 AND username = ?`,
      [username]
    );

    if (result.length > 0) {
      const user = result[0];
// console.log("User found in database:", user); // Agrega este log para verificar el usuario encontrado
      const match = await bcrypt.compare(password, user.password);
      // console.log("Password match result:", match); // Agrega este log para verificar el resultado de la comparación

      if (match) {
        return {
          isValid: true,
          id: user.id,
          username: user.username,
          id_level: user.id_level,
          id_sucursal: user.id_sucursal
        };
      }

      return { isValid: false };
    }

    return { isValid: false };

  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};