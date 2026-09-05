import "dotenv/config";
import { Request, Response } from "express";
import axios from "axios";
import crypto from "crypto";
import { updateDataOrden } from '../services/orden/update.services';
import { sendNotification } from '../app';


export const createTransaccion = async (req: Request, res: Response) => {
  const PAGOPAR_API_URL = process.env.PAGOPAR_API_URL;
  const PAGOPAR_PUBLIC_KEY = process.env.PAGOPAR_PUBLIC_KEY;
  const PAGOPAR_TOKEN_PRIVADO = process.env.PAGOPAR_TOKEN_PRIVADO;

  try {
    const data = req.body; // lo que recibís desde el frontend
    console.log("🚀 ~ Data recibida del frontend:", data);

    const { id_pedido_comercio, monto_total } = data;

    // Generar el token dinámico
    const token = crypto
      .createHash("sha1")
      .update(PAGOPAR_TOKEN_PRIVADO + id_pedido_comercio + String(parseFloat(monto_total)))
      .digest("hex");

    // Construir el payload con token incluido
    const payload = {
      ...data,
      public_key: PAGOPAR_PUBLIC_KEY, // aseguramos que lleve la public_key correcta
      token,
    };

    console.log("🚀 ~ Payload a enviar a Pagopar:", payload);

    // Configura los headers según la documentación de Pagopar
    const headers = {
      "Content-Type": "application/json",
    };

    // Hacemos el request a Pagopar
    const response = await axios.post(PAGOPAR_API_URL!, payload, { headers });

    // Obtener respuesta de Pagopar
    const respuesta = response.data?.resultado?.[0];

    if (!respuesta || respuesta === "E" || respuesta === "L") {
      return res.status(400).json({
        message: "Error en Pagopar",
        data: response.data,
      });
    }

    // ✅ Retornar respuesta al frontend
    return res.json({
      message: "Transacción creada correctamente",
      data: respuesta,
    });

  } catch (error: any) {
    console.error("Error creando transacción:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Error al crear transacción",
      error: error.response?.data || error.message,
    });
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

// export const recibirNotificacionPagopar = async (req: Request, res: Response) => {
//   try {
//     const privateKey = process.env.PAGOPAR_TOKEN_PRIVADO!;
//     const publicKey = process.env.PAGOPAR_PUBLIC_KEY!;

//     const datos = req.body;
//     console.log("📩 Notificación recibida de Pagopar:", datos);

//     const { respuesta, resultado } = datos;

//     // Verificar estructura de la respuesta
//     if (!respuesta || !Array.isArray(resultado) || resultado.length === 0) {
//       console.warn("⚠️ Estructura de notificación inválida:", datos);
//       return res.status(400).json([{ pagado: false }]);
//     }

//         const pago = resultado[0];

//     // Validar token
//     const hashPedido = String(pago.hash_pedido);
//     // console.log("🔑 Hash del pedido:", hashPedido);
//     const tokenRecibido = String(pago.token); 
//     // console

//     const tokenEsperado = crypto
//       .createHash("sha1")
//       .update(privateKey + hashPedido)
//       .digest("hex");

//       // console.log("🔑 Token esperado:", tokenEsperado);
//     if (tokenEsperado !== tokenRecibido) {
//       console.warn("❌ Token inválido. Posible intento de manipulación.");
//       return res.status(200).json([{ pagado: false, error: "Token inválido" }]);
//     }

//     if (pago.pagado === true && pago.cancelado === false) {
//       // ✅ Pago exitoso
//       console.log("✅ Pago confirmado:", pago);

//       // Guardar en DB si querés
//       const id_pedido = String(pago.numero_pedido);
//       const fecha_pago = String(pago.fecha_pago);
//       const pagado = 1; // true

//       const updateData = {
//         status_pago: pagado,
//         fecha_pago: fecha_pago
//       };

//       await updateDataOrden("orders", id_pedido, updateData);

//       console.log("Datos para actualizar la orden:", updateData);
//       // await savePayment(pago);

//       // 👉 Retornar directamente el array con el pago
//       return res.status(200).json([pago]);
//     } else {
//       // ❌ Pago rechazado o cancelado o pendiente
//       console.warn("⚠️ Pago no exitoso:", pago);

//       // 👉 Devolvemos el mismo objeto pero con `pagado: false`
//       const pagoNoExitoso = {
//         ...pago,
//         pagado: false,
//         fecha_pago: null, // aseguramos que sea null
//       };

//       return res.status(200).json([pagoNoExitoso]);
//     }
//   } catch (error: any) {
//     console.error("❌ Error procesando notificación:", error.message);
//     return res.status(500).json([{ pagado: false }]);
//   }
// };


export const recibirResultadoPagopar = async (req: Request, res: Response) => {
  try {
    const hashPedido: string = String(req.body.hash);

    const privateKey = process.env.PAGOPAR_TOKEN_PRIVADO!;
    const publicKey = process.env.PAGOPAR_PUBLIC_KEY!;

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

    // Enviar notificación con el resultado
    sendNotification(
      'transaction_status',
      'Consulta de pago recibida',
      {
        hashPedido,
        status: send.data.resultado[0]?.pagado ? 'success' : 'pending',
        data: send.data
      }
    );

    return res.json(send.data);

  } catch (error) {
    console.error("❌ Error en recibirResultadoPagopar:", error);
    
    // Notificación de error
    sendNotification(
      'error',
      'Error al consultar el estado del pago',
      { hashPedido: req.body.hash }
    );
    
    return res.status(500).json({ error: "Error interno" });
  }
};

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
      // Notificación de pago exitoso
      sendNotification(
        'payment_success',
        'Pago confirmado exitosamente',
        {
          orderNumber: pago.numero_pedido,
          amount: pago.monto,
          paymentDate: pago.fecha_pago
        }
      );

      // Guardar en DB si querés
      const id_pedido = String(pago.numero_pedido);
      const fecha_pago = String(pago.fecha_pago);
      const pagado = 1; // true

      const updateData = {
        status_pago: pagado,
        fecha_pago: fecha_pago
      };

      await updateDataOrden("orders", id_pedido, updateData);

      console.log("Datos para actualizar la orden:", updateData);
      // await savePayment(pago);

      // 👉 Retornar directamente el array con el pago
      return res.status(200).json([pago]);
    } else {
      // Notificación de pago no exitoso
      sendNotification(
        'payment_failed',
        'El pago no fue exitoso o está pendiente',
        {
          orderNumber: pago.numero_pedido,
          status: pago.pagado ? 'pending' : 'failed'
        }
      );

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
    // Notificación de error
    sendNotification(
      'error',
      'Error al procesar la notificación de pago',
      { error: error.message }
    );
    
    console.error("❌ Error procesando notificación:", error.message);
    return res.status(500).json([{ pagado: false }]);
  }
};
