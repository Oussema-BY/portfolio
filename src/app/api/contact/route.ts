import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/* ── Types ─────────────────────────────────── */
interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ── Validation ─────────────────────────────── */
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim())    return 'Name is required.';
  if (!body.email?.trim())   return 'Email is required.';
  if (!body.subject?.trim()) return 'Subject is required.';
  if (!body.message?.trim()) return 'Message is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Invalid email address.';
  if (body.message.length > 4000) return 'Message too long (max 4000 chars).';
  return null;
}

/* ── Nodemailer Transporter ─────────────────── */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/* ── Premium HTML Email Template ───────────── */
function buildEmailHtml(payload: ContactPayload): string {
  const { name, email, subject, message } = payload;
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  const escapedMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Contact — ${subject}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #0D1117;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #C9D1D9;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 620px;
      margin: 40px auto;
      padding: 0 16px;
    }

    /* ─ Header ─ */
    .header {
      background: linear-gradient(135deg, #0F1629 0%, #161B27 100%);
      border: 1px solid #1E2A3A;
      border-bottom: none;
      border-radius: 20px 20px 0 0;
      padding: 40px 48px 36px;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 220px; height: 220px;
      background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
      border-radius: 50%;
    }

    .header::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
    }

    .logo-badge {
      background: linear-gradient(135deg, #6366F1, #818CF8);
      border-radius: 12px;
      width: 44px; height: 44px;
      text-align: center;
      line-height: 44px;
      font-size: 18px; font-weight: 800; color: #fff;
      letter-spacing: -1px;
    }

    .logo-text {
      font-size: 16px; font-weight: 700; color: #EEF2FF;
      letter-spacing: -0.3px;
      line-height: 1.2;
    }

    .logo-sub {
      font-size: 12px; color: #4A5568; margin-top: 1px;
      line-height: 1.2;
    }

    .badge-new {
      display: inline-block;
      background: rgba(99,102,241,0.12);
      border: 1px solid rgba(99,102,241,0.3);
      border-radius: 20px;
      padding: 6px 12px;
      font-size: 11px; font-weight: 600;
      color: #818CF8;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
      line-height: 1;
    }

    .badge-dot {
      display: inline-block;
      width: 6px; height: 6px;
      background: #818CF8;
      border-radius: 50%;
      margin-right: 6px;
      vertical-align: middle;
    }

    .header-title {
      font-size: 26px; font-weight: 700;
      color: #EEF2FF;
      line-height: 1.25;
      letter-spacing: -0.5px;
    }

    .header-sub {
      font-size: 14px; color: #7F8EA3;
      margin-top: 8px; line-height: 1.5;
    }

    /* ─ Body ─ */
    .body {
      background: #0C1018;
      border: 1px solid #1E2A3A;
      border-top: none; border-bottom: none;
      padding: 40px 48px;
    }

    /* ─ Sender Card ─ */
    .sender-card {
      background: #141926;
      border: 1px solid #1C2840;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 32px;
      width: 100%;
    }

    .sender-avatar {
      width: 48px; height: 48px;
      background: linear-gradient(135deg, #6366F1, #06B6D4);
      border-radius: 50%;
      font-size: 18px; font-weight: 700; color: #fff;
      text-align: center;
      line-height: 48px;
    }

    .sender-name { font-size: 16px; font-weight: 600; color: #EEF2FF; }
    .sender-email { font-size: 13px; color: #6366F1; margin-top: 3px; }

    /* ─ Field rows ─ */
    .field-label {
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: #3D4F66;
      margin-bottom: 6px;
    }

    .field-value {
      font-size: 14px; color: #C9D1D9;
      line-height: 1.55;
    }

    .divider {
      border: none;
      border-top: 1px solid #1C2840;
      margin: 24px 0;
    }

    /* ─ Subject pill ─ */
    .subject-pill {
      display: inline-block;
      background: rgba(6,182,212,0.08);
      border: 1px solid rgba(6,182,212,0.25);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 15px; font-weight: 600;
      color: #67E8F9;
    }

    /* ─ Message box ─ */
    .message-box {
      background: #0F1629;
      border: 1px solid #1E2A3A;
      border-left: 3px solid #6366F1;
      border-radius: 0 10px 10px 0;
      padding: 20px 24px;
      margin-top: 12px;
      font-size: 15px; color: #C9D1D9;
      line-height: 1.7;
    }

    /* ─ CTA ─ */
    .cta-wrap { text-align: center; margin-top: 36px; }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #6366F1, #818CF8);
      color: #fff !important;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 12px;
      font-size: 15px; font-weight: 600;
      letter-spacing: -0.1px;
      box-shadow: 0 8px 24px rgba(99,102,241,0.35);
    }

    .cta-note {
      font-size: 12px; color: #3D4F66;
      margin-top: 12px;
    }

    /* ─ Footer ─ */
    .footer {
      background: #070A14;
      border: 1px solid #1E2A3A;
      border-top: none;
      border-radius: 0 0 20px 20px;
      padding: 28px 48px;
      text-align: center;
    }

    .footer-text {
      font-size: 12px; color: #3D4F66;
      line-height: 1.7;
    }

    .footer-accent { color: #6366F1; }

    .timestamp-badge {
      display: inline-flex;
      align-items: center; gap: 6px;
      background: #0C1018;
      border: 1px solid #1C2840;
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 11px; color: #4A5568;
      margin-top: 16px;
    }

    /* ─ Responsive ─ */
    @media (max-width: 480px) {
      .header, .body, .footer { padding-left: 24px; padding-right: 24px; }
      .header-title { font-size: 22px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
        <tr>
          <td style="vertical-align: middle; padding-right: 12px;">
            <div class="logo-badge">OBY</div>
          </td>
          <td style="vertical-align: middle;">
            <div class="logo-text">Oussema Ben Yahia</div>
            <div class="logo-sub">Portfolio Contact System</div>
          </td>
        </tr>
      </table>

      <div class="badge-new">
        <span class="badge-dot"></span>New Inquiry
      </div>

      <h1 class="header-title">You've got a new message,<br/>Oussema.</h1>
      <p class="header-sub">
        Someone reached out through your portfolio contact form.<br/>
        Here are all the details below.
      </p>
    </div>

    <!-- Body -->
    <div class="body">

      <!-- Sender card -->
      <table border="0" cellpadding="0" cellspacing="0" class="sender-card">
        <tr>
          <td style="width: 48px; padding-right: 16px; vertical-align: middle;">
            <div class="sender-avatar">${name.charAt(0).toUpperCase()}</div>
          </td>
          <td style="vertical-align: middle;">
            <div class="sender-name">${name}</div>
            <div class="sender-email">${email}</div>
          </td>
        </tr>
      </table>

      <!-- Subject -->
      <div class="field-label">Subject</div>
      <div class="subject-pill">${subject}</div>

      <hr class="divider"/>

      <!-- Message -->
      <div class="field-label">Message</div>
      <div class="message-box">${escapedMessage}</div>

      <!-- CTA -->
      <div class="cta-wrap">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="cta-btn">
          Reply to ${name}
        </a>
        <p class="cta-note">Clicking will open your email client with a pre-filled reply.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        This email was sent automatically from your portfolio at<br/>
        <span class="footer-accent">oussemabenyahia.vercel.app</span>
      </p>
      <div class="timestamp-badge">
        Sent: ${timestamp}
      </div>
    </div>

  </div>
</body>
</html>`;
}

/* ── Auto-reply to sender ───────────────────── */
function buildAutoReplyHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Thanks for reaching out — Oussema Ben Yahia</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0D1117;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #C9D1D9;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper { max-width: 580px; margin: 40px auto; padding: 0 16px; }

    .card {
      background: #0C1018;
      border: 1px solid #1E2A3A;
      border-radius: 20px;
      overflow: hidden;
    }

    .top-bar {
      height: 4px;
      background: linear-gradient(90deg, #6366F1, #06B6D4);
    }

    .content { padding: 48px; }

    .logo-badge {
      background: linear-gradient(135deg, #6366F1, #818CF8);
      border-radius: 14px;
      width: 52px; height: 52px;
      text-align: center;
      line-height: 52px;
      font-size: 20px; font-weight: 800; color: #fff;
      letter-spacing: -1px;
      margin-bottom: 28px;
    }

    h1 {
      font-size: 24px; font-weight: 700;
      color: #EEF2FF; letter-spacing: -0.5px;
      margin-bottom: 12px;
    }

    .sub {
      font-size: 15px; color: #7F8EA3;
      line-height: 1.6; margin-bottom: 32px;
    }

    .info-row {
      background: #141926;
      border: 1px solid #1C2840;
      border-left: 4px solid #6366F1;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 12px;
    }

    .info-text { font-size: 14px; color: #C9D1D9; line-height: 1.4; }
    .info-label { font-size: 11px; color: #4A5568; text-transform: uppercase; letter-spacing: 0.1em; }

    .footer-note {
      font-size: 13px; color: #4A5568;
      text-align: center;
      padding: 24px 48px;
      border-top: 1px solid #1C2840;
    }

    .accent { color: #6366F1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="top-bar"></div>
      <div class="content">
        <div class="logo-badge">OBY</div>
        <h1>Thanks, ${name}!</h1>
        <p class="sub">
          Your message has been received. I personally review every inquiry and
          will get back to you as soon as possible — usually within 24 hours.
        </p>

        <div class="info-row" style="border-left-color: #6366F1;">
          <div>
            <div class="info-label">Response time</div>
            <div class="info-text">Within 24 hours on business days</div>
          </div>
        </div>

        <div class="info-row" style="border-left-color: #06B6D4;">
          <div>
            <div class="info-label">Based in</div>
            <div class="info-text">Tunis, Tunisia — CET / UTC+1</div>
          </div>
        </div>

        <div class="info-row" style="border-left-color: #10B981;">
          <div>
            <div class="info-label">Currently</div>
            <div class="info-text">Available for freelance &amp; full-time</div>
          </div>
        </div>
      </div>

      <div class="footer-note">
        You're receiving this because you contacted
        <span class="accent">Oussema Ben Yahia</span> through his portfolio.
      </div>
    </div>
  </div>
</body>
</html>`;
}

/* ── Route Handler ──────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body: Partial<ContactPayload> = await req.json();

    // Validate
    const error = validate(body);
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    const payload = body as ContactPayload;

    // Check env vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[contact] EMAIL_USER or EMAIL_PASS not set');
      return NextResponse.json(
        { success: false, error: 'Email service not configured.' },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    // 1. Notify Oussema
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: payload.email,
      subject: `New Contact: ${payload.subject}`,
      html: buildEmailHtml(payload),
      text: `From: ${payload.name} <${payload.email}>\n\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
    });

    // 2. Auto-reply to sender
    await transporter.sendMail({
      from: `"Oussema Ben Yahia" <${process.env.EMAIL_USER}>`,
      to: payload.email,
      subject: `Thanks for reaching out, ${payload.name}! — Oussema Ben Yahia`,
      html: buildAutoReplyHtml(payload.name),
      text: `Hey ${payload.name}, thanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nBest,\nOussema Ben Yahia`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
