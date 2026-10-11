"use client";

import { type FormEvent, useState } from "react";
import { contact } from "@/content/site";
import { formEndpoint } from "@/lib/config";
import { useMagnetic } from "@/hooks/useMagnetic";

type Status = "idle" | "invalid" | "sending" | "success" | "failure";

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const { form: copy } = contact;

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8 12.5l2.7 2.7L16 9.5" />
  </svg>
);

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const magnetic = useMagnetic<HTMLButtonElement>();
  const sending = status === "sending";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { name = "", email = "", details = "" } = data;

    if (!name.trim() || !EMAIL_RE.test(email) || !details.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, details }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("failure");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid content-start gap-4">
      {/* placeholder=" " lets CSS float the label up once the field has content */}
      <div className="float-field">
        <input id="cf-name" name="name" required autoComplete="name" placeholder=" " disabled={sending} />
        <label htmlFor="cf-name">{copy.name}</label>
      </div>
      <div className="float-field">
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder=" " disabled={sending} />
        <label htmlFor="cf-email">{copy.email}</label>
      </div>
      <div className="float-field">
        <textarea id="cf-details" name="details" required placeholder=" " disabled={sending} />
        <label htmlFor="cf-details">{copy.details}</label>
      </div>
      <button
        {...magnetic}
        type="submit"
        disabled={sending}
        className="btn btn-primary w-full justify-center py-4 disabled:opacity-70 min-[861px]:w-auto min-[861px]:justify-self-start"
      >
        {copy.submit}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </button>
      <div role="status" aria-live="polite" data-state={status} className="form-status">
        {status === "success" && <CheckIcon />}
        {status !== "idle" && copy.states[status]}
      </div>
    </form>
  );
}
