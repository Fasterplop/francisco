import { Resend } from 'resend';
import type { APIRoute } from 'astro';

// 1. OBLIGATORIO: Modo dinámico para Cloudflare
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
    // 2. DIAGNÓSTICO: Verificamos si la clave existe
    const apiKey = import.meta.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("CRITICAL ERROR: RESEND_API_KEY is missing in environment variables.");
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing API Key' }), { status: 500 });
    }

    // 3. INICIALIZACIÓN SEGURA: Iniciamos Resend DENTRO de la función
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

    // Validación
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Faltan campos' }), { status: 400 });
    }

    // Sanitización
    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanIG = instagram ? sanitize(instagram.trim()) : 'No indicado';
    const cleanMsg = sanitize(message.trim());
    const cleanType = sessionType ? sanitize(sessionType.trim()) : 'No seleccionado';
    const adultStatus = isAdult ? "✅ Sí (+18)" : "❌ No";

    // Envío
    const { data: emailData, error } = await resend.emails.send({
      from: 'FJ Cueva Web <web@fj-cueva.com>', // Asegúrate que este dominio esté verificado en Resend
      to: ['tucorreo@gmail.com'], // <--- TU CORREO REAL
      replyTo: cleanEmail,
      subject: `🎨 Nuevo Lead: ${cleanName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Nueva Solicitud de Bodypaint</h2>
          <hr/>
          <p><strong>Nombre:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Instagram:</strong> ${cleanIG}</p>
          <p><strong>Tipo:</strong> ${cleanType}</p>
          <p><strong>Mayor de edad:</strong> ${adultStatus}</p>
          <br/>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #eee; padding: 15px;">${cleanMsg}</blockquote>
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
    // Convertimos el error a string de forma segura
    const errorMessage = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};