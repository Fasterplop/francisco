// src/pages/api/promo.ts
import { Resend } from 'resend';
import type { APIRoute } from 'astro';

// 1. OBLIGATORIO: Activa el modo servidor para este archivo
export const prerender = false;

// Función de limpieza
const sanitize = (text: string) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const POST: APIRoute = async ({ request }) => {
  try {
    // 2. OBTENER CLAVE: Verificamos si existe antes de usarla
    const apiKey = import.meta.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("ERROR CRÍTICO: Falta la variable RESEND_API_KEY");
      return new Response(JSON.stringify({ error: 'Error de configuración del servidor (Falta API Key)' }), { status: 500 });
    }

    // 3. INICIALIZAR RESEND (Adentro de la función, protegido)
    const resend = new Resend(apiKey);

    const data = await request.formData();
    
    // Extraer campos
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const instagram = data.get('instagram') as string;
    const message = data.get('message') as string;
    const sessionType = data.get('sessionType') as string;
    const isAdult = data.get('isAdult');

    // Honeypot
    if (data.get('confirm_email')) {
      return new Response(JSON.stringify({ message: 'Enviado' }), { status: 200 });
    }

    // Validación básica
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Faltan campos requeridos' }), { status: 400 });
    }

    // Sanitización
    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanIG = instagram ? sanitize(instagram.trim()) : 'No indicado';
    const cleanMsg = sanitize(message.trim());
    const cleanType = sessionType ? sanitize(sessionType.trim()) : 'No seleccionado';
    const adultStatus = isAdult ? "✅ Sí (+18)" : "❌ No confirmado";

    // 4. ENVÍO DEL CORREO
    const { data: emailData, error } = await resend.emails.send({
      from: 'FJ Cueva Web <web@fj-cueva.com>', 
      to: ['tucorreo@gmail.com'], // <--- ¡ASEGÚRATE DE PONER TU CORREO REAL AQUÍ!
      replyTo: cleanEmail,
      subject: `🎨 Nuevo Lead: ${cleanName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2 style="color: #000;">Nueva Solicitud de Bodypaint</h2>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <p><strong>Nombre:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <p><strong>Instagram:</strong> ${cleanIG}</p>
          <p><strong>Tipo de Sesión:</strong> ${cleanType}</p>
          <p><strong>Mayor de edad:</strong> ${adultStatus}</p>
          
          <br/>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; border-left: 4px solid #333;">
            ${cleanMsg.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Éxito', id: emailData?.id }), { status: 200 });

  } catch (e) {
    console.error("Server Crash:", e);
    const errorMessage = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};