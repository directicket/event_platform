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
      const { to, qrCode, eventId } = await req.json();

      console.log("Received qrCode:", qrCode);
      if (typeof qrCode !== 'string') {
        throw new Error("qrCode must be a valid string");
      }      

      const qrCodeDataUrl = await QRCode.toDataURL(qrCode);

      // Upload the QR code to Cloudinary
      const uploadResponse = await cloudinary.v2.uploader.upload(qrCodeDataUrl, {
        folder: 'tickets', // Optional folder name for organization
      });
  
      const qrCodeUrl = uploadResponse.secure_url; // Get the URL of the uploaded QR code

      const event = await getEventById(eventId);
  
      if (!event) throw new Error("Event data is missing");
  
      const emailHtml = `
        <div style="padding: 20px; border: 1px solid #333; max-width: 600px;">
            <h2>${event.title}</h2>
            <p><strong>Date:</strong> ${formatDateTime(event.startDateTime).dateOnly}</p>
            <p><strong>Time:</strong> ${formatDateTime(event.startDateTime).timeOnly}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Organizer:</strong> @${event.organizer.username}</p>
            <hr />
            <p>Scan this QR Code at the entrance:</p>
            <img src="${qrCodeUrl}" alt="QR Code" style="width: 150px; height: 150px;" />
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
