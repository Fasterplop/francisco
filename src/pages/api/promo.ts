import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

const sanitize = (text: string) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// 1. AGREGAMOS 'locals' A LOS ARGUMENTOS
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 2. CORRECCIÓN CRÍTICA:
    // Intentamos leer la clave desde el entorno de Cloudflare (Runtime)
    // Si no existe (ej: en local), usamos import.meta.env
    // @ts-ignore (Ignoramos error de tipo si TS se queja de runtime)
    const runtimeEnv = locals.runtime?.env || {}; 
    const apiKey = runtimeEnv.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    
    // Diagnóstico en logs de Cloudflare
    if (!apiKey) {
      console.error("ERROR FATAL: No se encontró RESEND_API_KEY en locals.runtime.env ni en import.meta.env");
      return new Response(JSON.stringify({ error: 'Configuración del servidor incompleta (Falta API Key)' }), { status: 500 });
    }

    const resend = new Resend(apiKey);

    const data = await request.formData();
    
    // Extraer datos
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

    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanIG = instagram ? sanitize(instagram.trim()) : 'No indicado';
    const cleanMsg = sanitize(message.trim());
    const cleanType = sessionType ? sanitize(sessionType.trim()) : 'No seleccionado';
    const adultStatus = isAdult ? "✅ Sí (+18)" : "❌ No confirmado";

    
    const { data: emailData, error } = await resend.emails.send({
      from: 'FJ Cueva Web <web@fj-cueva.com>', 
      to: ['grabarico@gmail.com'], 
      replyTo: cleanEmail,
      subject: `🎨 Nuevo Lead: ${cleanName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2 style="color: #000;">Nueva Solicitud de Bodypaint</h2>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Nombre:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <p><strong>Instagram:</strong> ${cleanIG}</p>
          <p><strong>Tipo:</strong> ${cleanType}</p>
          <p><strong>Edad +18:</strong> ${adultStatus}</p>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <strong>Mensaje:</strong><br/>
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