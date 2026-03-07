import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send";

export async function GET() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpFrom = process.env.SMTP_FROM;

  const result = await sendEmail("info@zorgwoningvergelijker.nl", {
    type: "contact_bevestiging",
    naam: "Test",
    onderwerp: "Diagnostische test",
  });

  return NextResponse.json({
    envCheck: {
      SMTP_HOST: smtpHost ? `set (${smtpHost})` : "NOT SET",
      SMTP_USER: smtpUser ? "set" : "NOT SET",
      SMTP_FROM: smtpFrom ? `set (${smtpFrom})` : "NOT SET",
    },
    emailResult: result,
  });
}
