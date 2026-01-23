import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Función simple para escapar HTML y evitar XSS (Cross-Site Scripting)
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
    const data = await request.formData();
    
    // 1. EXTRAER CAMPOS
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const instagram = data.get('instagram') as string;
    const message = data.get('message') as string;
    
    // 2. SEGURIDAD: HONEYPOT (Trampa para bots)
    // El campo 'confirm_email' estará oculto en el frontend.
    // Si un bot lo llena, descartamos la solicitud silenciosamente.
    const honeypot = data.get('confirm_email');
    if (honeypot) {
      console.warn(`Bot detectado (Honeypot activado) - IP: ${request.headers.get('CF-Connecting-IP') || 'Unknown'}`);
      // Respondemos con éxito falso para confundir al bot
      return new Response(JSON.stringify({ message: 'Enviado con éxito' }), { status: 200 });
    }

    // 3. VALIDACIÓN
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos requeridos' }), 
        { status: 400 }
      );
    }

    // 4. SANITIZACIÓN (Limpiamos los inputs antes de usarlos)
    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanIG = instagram ? sanitize(instagram.trim()) : 'No proporcionado';
    const cleanMessage = sanitize(message.trim());

    // 5. ENVÍO (Solo si pasó todas las barreras)
    const { error } = await resend.emails.send({
      from: 'Web Form <onboarding@resend.dev>', // Cambia esto cuando verifiques tu dominio
      to: ['tucorreo@ejemplo.com'], // <--- TU CORREO
      replyTo: cleanEmail, // Para responderle directo al usuario
      subject: `🎨 Bodypaint: ${cleanName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #333;">Nueva Solicitud de Bodypaint</h2>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nombre:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <p><strong>Instagram:</strong> ${cleanIG}</p>
          <br/>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #000;">
            ${cleanMessage.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: 'Correo enviado con éxito' }), 
      { status: 200 }
    );

  } catch (e) {
    // Manejo de error robusto
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};