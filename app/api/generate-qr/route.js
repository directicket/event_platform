import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import QRCode from 'qrcode';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

// Load Google Sheets credentials
const keyPath = path.join(process.cwd(), "config", "directicket-qr-2da9dfd5da00.json");
const credentials = JSON.parse(fs.readFileSync(keyPath, "utf8"));

const authClient = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth: authClient });

const SPREADSHEET_ID = "1UVwYZQ4wbvP3wIQz5HmRmxcWXO9YuwO0BQuYABavLDY"; // Replace with your actual Sheet ID
const SHEET_NAME = "qr-codes"; // Update if your sheet is named differently

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    // Fetch existing entries from Google Sheets
    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:C`,
    });

    const rows = sheetData.data.values || [];

    // Check if the userID and reference already exist
    const existingEntry = rows.find(row => row[0] === userId && row[1] === reference);

    if (existingEntry) {
      // Return the existing QR code
      const storedQRCode = existingEntry[2];
      const qrCodeDataUrl = await QRCode.toDataURL(storedQRCode);
      const base64Data = qrCodeDataUrl.split(',')[1];
      const imageBuffer = Buffer.from(base64Data, 'base64');

      return new Response(imageBuffer, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    }

    // Verify payment status from Paystack
    const paystackVerificationUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await fetch(paystackVerificationUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok || !data.status || data.data.status !== 'success') {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Generate a unique 10-character code
    const randomCode = Math.random().toString(36).substring(2, 12).toUpperCase();
    const finalCode = `${userId}-${randomCode}`;

    // Generate QR code as a data URL
    const qrCodeDataUrl = await QRCode.toDataURL(finalCode);
    const base64Data = qrCodeDataUrl.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Store in Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:C1`, // Assuming first three columns are used
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[userId, reference, finalCode]],
      },
    });

    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });

  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
