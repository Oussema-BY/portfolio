"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Download,
  Send,
  CheckCircle2,
  Loader2,
  BellRing,
  MailCheck,
  Timer,
} from "lucide-react";

type FormState = "idle" | "sending" | "sent" | "error";
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export function Contact() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const visible = useSectionReveal(sectionRef);

  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [focused, setFocused] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const set = (key: keyof FormData) => (val: string) =>
    setFormData((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormState("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
      }
    } catch {
      setErrorMsg("Network error — please check your connection.");
      setFormState("error");
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    fontSize: "1rem", // 16px prevents iOS browser auto-zoom
    outline: "none",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "rgba(56,189,248,0.6)" : "rgba(255,255,255,0.08)"}`,
    color: "#FAFAFA",
    transition: "border-color 0.2s ease",
    boxShadow: focused === field ? "0 0 0 3px rgba(56,189,248,0.08)" : "none",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: "#0C0C0E" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: "#38BDF8" }} />
            <span className="text-label" style={{ color: "#38BDF8" }}>
              Get In Touch
            </span>
            <div className="w-5 h-px" style={{ backgroundColor: "#38BDF8" }} />
          </div>
          <h2
            className="font-bold text-white mb-3 md:mb-4 mx-auto tracking-tight"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 3rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              maxWidth: "600px",
            }}
          >
            Have A Product In Mind?
            <br />
            <span style={{ color: "#38BDF8" }}>Let&apos;s Build It.</span>
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: "#71717A" }}
          >
            Available for full-time engineering roles, SaaS development, and high-impact freelance projects.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8"
        >
          {/* Status */}
          <div
            className="rounded-xl p-4 flex items-start gap-3"
            style={{
              backgroundColor: "rgba(56,189,248,0.05)",
              border: "1px solid rgba(56,189,248,0.15)",
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "#38BDF8",
                  boxShadow: "0 0 6px rgba(56,189,248,0.6)",
                }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#38BDF8" }}>
                Available for Work
              </p>
              <p className="text-xs" style={{ color: "#52525B" }}>
                Open to full-time &amp; freelance. Replies within 24h.
              </p>
            </div>
          </div>

          {/* Email */}
          <a
            href="mailto:oussemabenyahia89@gmail.com"
            className="rounded-xl p-4 flex items-center gap-3 transition-all hover:border-opacity-30 cursor-pointer"
            style={{
              backgroundColor: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(56,189,248,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(56,189,248,0.15)" }}
            >
              <Mail className="w-4 h-4" style={{ color: "#38BDF8" }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#52525B] mb-0.5">Email</p>
              <p
                className="text-xs font-medium text-white truncate"
                title="oussemabenyahia89@gmail.com"
              >
                oussemabenyahia89@gmail.com
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+21658185125"
            className="rounded-xl p-4 flex items-center gap-3 transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(56,189,248,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(59,130,246,0.15)" }}
            >
              <Phone className="w-4 h-4" style={{ color: "#3B82F6" }} />
            </div>
            <div>
              <p className="text-xs text-[#52525B] mb-0.5">Phone</p>
              <p className="text-xs font-medium text-white">+216 58 185 125</p>
            </div>
          </a>

          {/* Location */}
          <div
            className="rounded-xl p-4 flex items-center gap-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(16,185,129,0.15)" }}
            >
              <MapPin className="w-4 h-4" style={{ color: "#10B981" }} />
            </div>
            <div>
              <p className="text-xs text-[#52525B] mb-0.5">Location</p>
              <p className="text-xs font-medium text-white">Tunis, Tunisia</p>
            </div>
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#111113",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Top gradient bar */}
          <div
            className="h-0.5 w-full"
            style={{ background: "linear-gradient(90deg, #38BDF8, #0284C7, #06B6D4)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
            {/* Left panel */}
            <div
              className="p-6 sm:p-8 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/5"
            >
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Send a Message
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>
                  Fill out the form and I&apos;ll get back to you personally.
                  You&apos;ll also receive an automatic confirmation.
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-2">
                {[
                  {
                    href: "https://github.com/Oussema-BY",
                    icon: <Github className="w-4 h-4" />,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/oussema-ben-yahia/",
                    icon: <Linkedin className="w-4 h-4" />,
                    label: "LinkedIn",
                  },
                  {
                    href: "mailto:oussemabenyahia89@gmail.com",
                    icon: <Mail className="w-4 h-4" />,
                    label: "Email",
                  },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#71717A] hover:text-white transition-all"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(56,189,248,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    {icon}
                  </a>
                ))}

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Resume"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#71717A] hover:text-white transition-all ml-auto"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(56,189,248,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>

              {/* What to expect */}
              <div className="space-y-3 mt-auto">
                {[
                  {
                    icon: <BellRing className="w-3.5 h-3.5 text-white" />,
                    title: "Instant notification",
                    sub: "I get alerted right away",
                    color: "#38BDF8",
                  },
                  {
                    icon: <MailCheck className="w-3.5 h-3.5 text-white" />,
                    title: "Auto-reply to you",
                    sub: "Confirmation in your inbox",
                    color: "#10B981",
                  },
                  {
                    icon: <Timer className="w-3.5 h-3.5 text-white" />,
                    title: "Fast response",
                    sub: "Usually within a few hours",
                    color: "#8B5CF6",
                  },
                ].map(({ icon, title, sub, color }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}25` }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#52525B" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="p-6 sm:p-8">
              {formState === "sent" ? (
                <div className="flex flex-col items-center justify-center min-h-[380px] text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#10B981" }} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-sm max-w-xs mb-1.5 leading-relaxed" style={{ color: "#71717A" }}>
                    Oussema has been notified. A confirmation email is on its
                    way to your inbox.
                  </p>
                  <p className="text-xs mb-8" style={{ color: "#52525B" }}>
                    (Check your spam folder if you don&apos;t see it within a minute.)
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #38BDF8, #0284C7)",
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="c-name"
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#52525B" }}
                      >
                        Full Name <span style={{ color: "#38BDF8" }}>*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => set("name")(e.target.value)}
                        placeholder="John Doe"
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="c-email"
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#52525B" }}
                      >
                        Email <span style={{ color: "#38BDF8" }}>*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => set("email")(e.target.value)}
                        placeholder="you@company.com"
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="c-subject"
                      className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#52525B" }}
                    >
                      Subject <span style={{ color: "#38BDF8" }}>*</span>
                    </label>
                    <input
                      id="c-subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => set("subject")(e.target.value)}
                      placeholder="What's this about?"
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("subject")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="c-message"
                      className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#52525B" }}
                    >
                      Message <span style={{ color: "#38BDF8" }}>*</span>
                    </label>
                    <textarea
                      id="c-message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => set("message")(e.target.value)}
                      placeholder="Tell me about your project, idea, or question..."
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), resize: "none" }}
                    />
                    <div
                      className={`text-right text-xs mt-1 ${formData.message.length > 3500 ? "" : ""}`}
                      style={{
                        color: formData.message.length > 3500 ? "#F59E0B" : "#52525B",
                      }}
                    >
                      {formData.message.length} / 4000
                    </div>
                  </div>

                  {/* Error */}
                  {formState === "error" && errorMsg && (
                    <div
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                      style={{
                        backgroundColor: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#F87171",
                      }}
                    >
                      <span>⚠</span> {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #38BDF8, #0284C7)",
                        boxShadow: "0 0 24px rgba(56,189,248,0.25)",
                      }}
                    >
                      {formState === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>
                      You&apos;ll receive an auto-reply
                      <br />
                      confirmation in your inbox.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

