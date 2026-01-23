import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Función simple para escapar HTML y evitar XSS
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
    
    // 1. EXTRAER CAMPOS (Incluyendo los nuevos)
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const instagram = data.get('instagram') as string;
    const message = data.get('message') as string;
    const sessionType = data.get('sessionType') as string; // 'Cuerpo Entero' | 'Parcial'
    const isAdult = data.get('isAdult'); // 'on' si está marcado

    // 2. HONEYPOT
    const honeypot = data.get('confirm_email');
    if (honeypot) {
      console.warn(`Bot detectado - IP: ${request.headers.get('CF-Connecting-IP') || 'Unknown'}`);
      return new Response(JSON.stringify({ message: 'Enviado con éxito' }), { status: 200 });
    }

    // 3. VALIDACIÓN
    if (!name || !email || !message || !sessionType) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos requeridos' }), 
        { status: 400 }
      );
    }

    // 4. SANITIZACIÓN
    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanIG = instagram ? sanitize(instagram.trim()) : 'No proporcionado';
    const cleanMessage = sanitize(message.trim());
    const cleanType = sanitize(sessionType.trim());
    const adultStatus = isAdult ? "✅ Sí, mayor de 18 (Confirmado)" : "❌ No confirmado";

    // 5. ENVÍO
    const { error } = await resend.emails.send({
      from: 'FJ Cueva Art <web@fj-cueva.com>', 
      to: ['Grabarico@gmail.com'], 
      replyTo: cleanEmail,
      subject: `🎨 Bodypaint: ${cleanName} [${cleanType}]`, 
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #111;">Nueva Solicitud de Bodypaint</h2>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; width: 140px;"><strong>Nombre:</strong></td>
              <td>${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td><a href="mailto:${cleanEmail}">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Instagram:</strong></td>
              <td>${cleanIG}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #0066cc;"><strong>Tipo de Sesión:</strong></td>
              <td><strong>${cleanType}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Mayor de 18:</strong></td>
              <td>${adultStatus}</td>
            </tr>
          </table>

          <br/>
          <p><strong>Mensaje / Motivación:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #333;">
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
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};