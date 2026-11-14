import { hasValue, site } from '../config/site';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.';
  if (values.subject.trim().length < 3) errors.subject = 'Enter a subject (at least 3 characters).';
  if (values.message.trim().length < 10) errors.message = 'Write a message of at least 10 characters.';
  else if (values.message.length > 4000) errors.message = 'Keep the message under 4000 characters.';
  return errors;
}

/** Which delivery service is configured, if any. */
export type Transport = 'web3forms' | 'endpoint' | null;

export function activeTransport(): Transport {
  if (hasValue(site.form.web3formsKey)) return 'web3forms';
  if (hasValue(site.form.endpoint)) return 'endpoint';
  return null;
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'not-configured' | 'failed'; message: string };

/**
 * Sends the message through the configured service and only reports success when
 * the service itself confirms delivery.
 */
export async function submitContact(values: ContactPayload, honeypot: string): Promise<SubmitResult> {
  // Bots fill hidden fields. Pretend it worked so they move on, but send nothing.
  if (honeypot) return { ok: true };

  const transport = activeTransport();
  if (!transport) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'This form is not connected to an email service yet, so your message was not sent.',
    };
  }

  const body =
    transport === 'web3forms'
      ? {
          access_key: site.form.web3formsKey,
          name: values.name.trim(),
          email: values.email.trim(),
          subject: `[Portfolio] ${values.subject.trim()}`,
          message: values.message.trim(),
          from_name: 'Portfolio contact form',
        }
      : {
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        };

  const url = transport === 'web3forms' ? 'https://api.web3forms.com/submit' : site.form.endpoint;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await response.json().catch(() => ({}))) as { success?: boolean; ok?: boolean; message?: string; error?: string };

    // Web3Forms returns { success }. Formspree returns { ok } on success.
    const confirmed = response.ok && (transport === 'web3forms' ? data.success === true : data.ok !== false);
    if (confirmed) return { ok: true };

    return {
      ok: false,
      reason: 'failed',
      message: data.message || data.error || 'The email service rejected the message. Please try again in a moment.',
    };
  } catch {
    return {
      ok: false,
      reason: 'failed',
      message: "Couldn't reach the email service. Check your connection and try again.",
    };
  }
}
