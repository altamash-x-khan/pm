import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// --- Server-side validation (mirrors frontend schema) ---
const contactSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// The email address Dr. Farheen will receive notifications at.
// Change this to Dr. Farheen's real email when ready for production.
const DOCTOR_EMAIL = "altovate.ai@gmail.com";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 1. Validate the payload
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || "Invalid data.";
            return NextResponse.json({ error: firstError }, { status: 400 });
        }

        const { name, email, phone, message } = result.data;

        // 2. Send email notification to Dr. Farheen
        const { error: sendError } = await resend.emails.send({
            from: "Homeopathy Contact Form <onboarding@resend.dev>",
            to: [DOCTOR_EMAIL],
            subject: `✉️ New Contact Message: ${name}`,
            html: buildEmailHtml({ name, email, phone: phone || "Not provided", message }),
        });

        if (sendError) {
            console.error("Resend error:", sendError);
            return NextResponse.json(
                { error: "Failed to send notification email. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}

// --- Clean, professional HTML email template (Matches Booking Template) ---
function buildEmailHtml(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#d4a0a0,#c08b8b);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">✉️ New Contact Message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">

              <!-- Sender Info -->
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#5c4a3a;border-bottom:2px solid #f0e6df;padding-bottom:8px;">
                Sender Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;color:#8a7a6d;font-size:14px;width:100px;">Name</td>
                  <td style="padding:6px 0;color:#3d2e22;font-size:14px;font-weight:600;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#8a7a6d;font-size:14px;">Email</td>
                  <td style="padding:6px 0;color:#3d2e22;font-size:14px;font-weight:600;">
                    <a href="mailto:${escapeHtml(data.email)}" style="color:#c08b8b;text-decoration:none;">${escapeHtml(data.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#8a7a6d;font-size:14px;">Phone</td>
                  <td style="padding:6px 0;color:#3d2e22;font-size:14px;font-weight:600;">
                    ${data.phone !== "Not provided"
            ? `<a href="tel:${escapeHtml(data.phone)}" style="color:#c08b8b;text-decoration:none;">${escapeHtml(data.phone)}</a>`
            : '<span style="color:#b0a396;font-style:italic;">Not provided</span>'}
                  </td>
                </tr>
              </table>

              <!-- Message Content -->
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#5c4a3a;border-bottom:2px solid #f0e6df;padding-bottom:8px;">
                Message Content
              </h2>
              <div style="background-color:#faf8f5;border-radius:10px;padding:16px;color:#3d2e22;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;text-align:center;background-color:#faf8f5;border-top:1px solid #f0e6df;">
              <p style="margin:0;color:#b0a396;font-size:12px;">
                This email was sent from the Dr. Farheen Homeopathy website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Prevent XSS in email HTML */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
