import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_G61G7UaV_FxHMSJpJJEjPLEq4XMYqT2xH");

export async function POST(req: Request) {
  const payload = await req.json();

  try {
    const { company, industry, projectRange, message } = payload;
    const emailHtml = `
      <h2>New Private Consult Request</h2>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Industry:</strong> ${industry}</p>
      <p><strong>Project Range:</strong> ${projectRange}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;
    await resend.emails.send({
      from: process.env.CONTACT_FROM || "onboarding@resend.dev", // Use CONTACT_FROM env variable
      to: ["jesasolutions@yahoo.com"], // Change to your preferred email
      subject: "New Private Consult Request",
      html: emailHtml,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
