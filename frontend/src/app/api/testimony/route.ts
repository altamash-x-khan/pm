import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const testimonySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    rating: z.number().int().min(1).max(5),
    condition: z.string().optional(),
    story: z.string().min(30, "Please share at least a sentence or two about your experience."),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Update to Dr. Farheen's real email when moving to production
const DOCTOR_EMAIL = "altovate.ai@gmail.com";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const result = testimonySchema.safeParse(body);
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || "Invalid data.";
            return NextResponse.json({ error: firstError }, { status: 400 });
        }

        const { name, rating, condition, story } = result.data;

        const { error: sendError } = await resend.emails.send({
            from: "Patient Testimony <onboarding@resend.dev>",
            to: [DOCTOR_EMAIL],
            subject: `${"⭐".repeat(rating)} New Patient Testimony: ${name}`,
            html: buildEmailHtml({ name, rating, condition: condition || "Not specified", story }),
        });

        if (sendError) {
            console.error("Resend error:", sendError);
            return NextResponse.json(
                { error: "Failed to send testimony. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Testimony API error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}

function buildEmailHtml(data: {
    name: string;
    rating: number;
    condition: string;
    story: string;
}) {
    const stars = "⭐".repeat(data.rating) + "☆".repeat(5 - data.rating);

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
            <td style="background:linear-gradient(135deg,#c8a96e,#b8945a);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">✨ New Patient Testimony</h1>
              <p style="margin:8px 0 0 0;color:rgba(255,255,255,0.85);font-size:14px;">A patient has shared their healing journey</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">

              <!-- Patient Info -->
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#5c4a3a;border-bottom:2px solid #f0e6df;padding-bottom:8px;">
                Patient Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;color:#8a7a6d;font-size:14px;width:120px;">Name</td>
                  <td style="padding:6px 0;color:#3d2e22;font-size:14px;font-weight:600;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#8a7a6d;font-size:14px;">Star Rating</td>
                  <td style="padding:6px 0;color:#3d2e22;font-size:16px;">${stars} (${data.rating}/5)</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#8a7a6d;font-size:14px;">Condition</td>
                  <td style="padding:6px 0;color:#3d2e22;font-size:14px;font-weight:600;">${escapeHtml(data.condition)}</td>
                </tr>
              </table>

              <!-- Story -->
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#5c4a3a;border-bottom:2px solid #f0e6df;padding-bottom:8px;">
                Their Story
              </h2>
              <div style="background-color:#faf8f5;border-radius:10px;padding:16px;color:#3d2e22;font-size:14px;line-height:1.7;white-space:pre-wrap;border-left:3px solid #c8a96e;">${escapeHtml(data.story)}</div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;text-align:center;background-color:#faf8f5;border-top:1px solid #f0e6df;">
              <p style="margin:0;color:#b0a396;font-size:12px;">
                Submitted from the Dr. Farheen Homeopathy website · Review and add to site when ready.
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

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
