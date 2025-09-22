import { data } from 'cheerio/dist/commonjs/api/attributes';
import "dotenv/config";
import { Request, Response } from "express";
import axios from "axios";
import crypto from "crypto";
import { insertDataOr } from '../services/orden/Insert.services';
import { getOneOrdenx } from '../services/orden/getOne.services';

export const createOrden = async (req: Request, res: Response) => {
  const tableName = "orders"; // Reemplaza con el nombre de tu tabla
  const data = req.body;
  console.log("🚀 ~ createOrden ~ data:", data)

  try {

    const resp = await insertDataOr(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getOneOrden = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("🚀 ~ getOneOrden ~ id (raw):", id);

  const tableName = "orders"; // 👈 tu tabla
  const idI = parseInt(id, 10);

  if (isNaN(idI)) {
    return res.status(400).json({ message: "ID inválido, debe ser un número" });
  }

  try {
    const Data = await getOneOrdenx(tableName, idI);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error getting orden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error desconocido" });
    }
  }
};


// export const recibirNotificacionPagopar = async (req: Request, res: Response) => {
//   try {
//     const datos = req.body;
//     console.log("📩 Notificación recibida de Pagopar:", datos);

//     const {
//       resultado,
//       numero_comprobante_interno,
//       monto,
//       moneda,
//       descripcion,
//       id,
//       comercio,
//       token,
//       respuesta
//     } = datos;

//     // Validar que el pago fue exitoso
//     if (resultado === true && respuesta === "Pago realizado con éxito") {
//       // Aquí podrías guardar el pago en tu base de datos
//       console.log("✅ Pago confirmado:", {
//         numero_comprobante_interno,
//         monto,
//         moneda,
//         descripcion,
//         id,
//         comercio,
//         token
//       });

//       // Respondés a Pagopar con éxito
//       return res.status(200).json({ message: "Notificación procesada correctamente" });
//     } else {
//       console.warn("⚠️ Pago no exitoso o incompleto:", datos);
//       return res.status(400).json({ message: "Pago no confirmado" });
//     }

//   } catch (error: any) {
//     console.error("❌ Error procesando notificación:", error.message);
//     return res.status(500).json({ message: "Error interno al procesar la notificación" });
//   }
// };


// export const recibirNotificacionPagopar = async (req: Request, res: Response) => {
//   try {
//     const datos = req.body;
//     console.log("📩 Notificación recibida de Pagopar:", datos);

//     const { respuesta, resultado } = datos;

//     // Verificar estructura de la respuesta
//     if (!respuesta || !Array.isArray(resultado) || resultado.length === 0) {
//       console.warn("⚠️ Estructura de notificación inválida:", datos);
//       return res.status(400).json({ message: "Estructura inválida" });
//     }

//     const pago = resultado[0]; // Tomamos el primer elemento del array

//     if (pago.pagado === true && pago.cancelado === false) {
//       // ✅ Pago exitoso
//       console.log("✅ Pago confirmado:", {
//         numero_comprobante_interno: pago.numero_comprobante_interno,
//         monto: pago.monto,
//         forma_pago: pago.forma_pago,
//         fecha_pago: pago.fecha_pago,
//         numero_pedido: pago.numero_pedido,
//         hash_pedido: pago.hash_pedido,
//         token: pago.token,
//       });

//       // Guardar en DB si querés
//       // await savePayment(pago);

//       return res.status(200).json({ message: "Notificación procesada correctamente" });
//     } else {
//       // ❌ Pago rechazado o cancelado
//       console.warn("⚠️ Pago no exitoso:", pago);
//       return res.status(400).json({ message: "Pago no confirmado" });
//     }

//   } catch (error: any) {
//     console.error("❌ Error procesando notificación:", error.message);
//     return res.status(500).json({ message: "Error interno al procesar la notificación" });
//   }
// };

export const recibirNotificacionPagopar = async (req: Request, res: Response) => {
  try {
    const privateKey = process.env.PAGOPAR_TOKEN_PRIVADO!;
    const publicKey = process.env.PAGOPAR_PUBLIC_KEY!;

    const datos = req.body;
    console.log("📩 Notificación recibida de Pagopar:", datos);

    const { respuesta, resultado } = datos;

    // Verificar estructura de la respuesta
    if (!respuesta || !Array.isArray(resultado) || resultado.length === 0) {
      console.warn("⚠️ Estructura de notificación inválida:", datos);
      return res.status(400).json([{ pagado: false }]);
    }

        const pago = resultado[0];

    // Validar token
    const hashPedido = String(pago.hash_pedido);
    // console.log("🔑 Hash del pedido:", hashPedido);
    const tokenRecibido = String(pago.token); 
    // console

    const tokenEsperado = crypto
      .createHash("sha1")
      .update(privateKey + hashPedido)
      .digest("hex");

      // console.log("🔑 Token esperado:", tokenEsperado);
    if (tokenEsperado !== tokenRecibido) {
      console.warn("❌ Token inválido. Posible intento de manipulación.");
      return res.status(200).json([{ pagado: false, error: "Token inválido" }]);
    }

    if (pago.pagado === true && pago.cancelado === false) {
      // ✅ Pago exitoso
      console.log("✅ Pago confirmado:", pago);

      // Guardar en DB si querés
      // await savePayment(pago);

      // 👉 Retornar directamente el array con el pago
      return res.status(200).json([pago]);
    } else {
      // ❌ Pago rechazado o cancelado o pendiente
      console.warn("⚠️ Pago no exitoso:", pago);

      // 👉 Devolvemos el mismo objeto pero con `pagado: false`
      const pagoNoExitoso = {
        ...pago,
        pagado: false,
        fecha_pago: null, // aseguramos que sea null
      };

      return res.status(200).json([pagoNoExitoso]);
    }
  } catch (error: any) {
    console.error("❌ Error procesando notificación:", error.message);
    return res.status(500).json([{ pagado: false }]);
  }
};


export const recibirResultadoPagopar = async (req: Request, res: Response) => {
  try {
    const hashPedido: string = String(req.body.hash);

    const privateKey = process.env.PAGOPAR_TOKEN_PRIVADO!;
    const publicKey = process.env.PAGOPAR_PUBLIC_KEY!;

    // ✅ Token correcto para consulta
    const tokenConsulta = crypto
      .createHash("sha1")
      .update(privateKey + "CONSULTA")
      .digest("hex");

    const data = {
      hash_pedido: hashPedido,
      token: tokenConsulta,
      token_publico: publicKey,
    };

    const send = await axios.post(
      "https://api.pagopar.com/api/pedidos/1.1/traer",
      data
    );

    console.log("🚀 ~ Respuesta de consulta de pedido:", send.data);

    // ✅ Enviar al frontend tal cual lo devuelve Pagopar
    return res.json(send.data);

  } catch (error) {
    console.error("❌ Error en recibirResultadoPagopar:", error);
    return res.status(500).json({ error: "Error interno" });
  }
};