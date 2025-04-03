import { Resend } from 'resend';
import { getEventById } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import cloudinary from 'cloudinary';
import QRCode from 'qrcode';

const resend = new Resend(process.env.RESEND_API_KEY);
export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req) {
    try {
      const { to, eventId } = await req.json();      

      const event = await getEventById(eventId);
  
      if (!event) throw new Error("Event data is missing");
  
      const emailHtml = `
        <div style="padding: 20px; border: 1px solid #333; max-width: 600px;">
            <h2>${event.title}</h2>
            <p><strong>Date:</strong> ${formatDateTime(event.endDateTime).dateOnly}</p>
            <p><strong>Time:</strong> ${formatDateTime(event.endDateTime).timeOnly}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Organizer:</strong> @${event.organizer.username}</p>
        </div>
      `;
  
      const data = await resend.emails.send({
        from: "tickets@directicket.live",
        to,
        subject: `Your Ticket: ${event.title}`,
        html: emailHtml,
      });
  
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error("Email sending error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
  }  
