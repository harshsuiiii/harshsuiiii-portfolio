"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const field =
  "mt-2 w-full rounded-(--radius-sm) border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-3 transition-colors focus:border-text focus:outline-none";

/**
 * No backend and no third-party form service: submitting composes an email in
 * the visitor's own mail client. Nothing is stored or sent from this site.
 */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || `Message from ${name || "your portfolio"}`;
    const message = String(data.get("message") ?? "").trim();
    const body = name ? `${message}\n\n— ${name}` : message;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="label block text-text-2">
          Your name
          <input name="name" type="text" autoComplete="name" required className={`${field} normal-case tracking-normal font-sans`} />
        </label>
        <label className="label block text-text-2">
          Subject
          <input name="subject" type="text" className={`${field} normal-case tracking-normal font-sans`} placeholder="What is it about?" />
        </label>
      </div>
      <label className="label block text-text-2">
        Message
        <textarea name="message" required rows={6} className={`${field} resize-y normal-case tracking-normal font-sans`} placeholder="Tell me about the problem." />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary h-[52px] px-7">
          Open in mail app <ArrowUpRight className="size-4" aria-hidden />
        </button>
        <p id="form-note" role="status" className="text-sm text-text-2">
          {status === "opened"
            ? "Your mail app should have opened with the message ready to send."
            : "This opens your own mail app with the message filled in. Nothing is stored here."}
        </p>
      </div>
    </form>
  );
}
