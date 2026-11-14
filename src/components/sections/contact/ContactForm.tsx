import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import {
  activeTransport,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from '../../../lib/contact';
import { hasValue, site } from '../../../config/site';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';

const empty: ContactPayload = { name: '', email: '', subject: '', message: '' };

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string };

interface FieldProps {
  name: keyof ContactPayload;
  label: string;
  type?: string;
  autoComplete?: string;
  rows?: number;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxLength?: number;
}

function Field({ name, label, type = 'text', autoComplete, rows, value, error, onChange, maxLength }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = cn(
    'w-full rounded-xl border bg-ink-900/70 px-4 py-3 text-[15px] text-fg placeholder:text-fg-mute transition-colors',
    'focus:border-cyan/70 focus:outline-none focus:ring-2 focus:ring-cyan/25',
    error ? 'border-rose-400/70' : 'border-white/12 hover:border-white/25',
  );

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, 'resize-y')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={shared}
        />
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-rose-300">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const configured = activeTransport() !== null;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name as keyof ContactPayload]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
    if (status.kind === 'sent' || status.kind === 'error') setStatus({ kind: 'idle' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Array<keyof ContactPayload>)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    const result = await submitContact(values, honeypotRef.current?.value ?? '');
    if (result.ok) {
      setStatus({ kind: 'sent' });
      setValues(empty);
    } else {
      setStatus({ kind: 'error', message: result.message });
    }
  };

  const mailto = hasValue(site.contact.email)
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(values.subject || 'Hello')}&body=${encodeURIComponent(values.message)}`
    : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!configured && (
        <div role="note" className="flex gap-3 rounded-xl border border-amber-300/30 bg-amber-300/[0.07] p-4 text-sm leading-relaxed text-amber-100">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Sending is not set up yet. Add a Web3Forms key or a form endpoint in <code className="font-mono text-xs">.env</code>{' '}
            to turn it on.
            {mailto ? ' Until then, the button below opens your email app instead.' : ''}
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" autoComplete="name" value={values.name} error={errors.name} onChange={handleChange} />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>
      <Field name="subject" label="Subject" value={values.subject} error={errors.subject} onChange={handleChange} />
      <Field
        name="message"
        label="Message"
        rows={6}
        maxLength={4000}
        value={values.message}
        error={errors.message}
        onChange={handleChange}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status.kind === 'sending' || !configured}
          leftIcon={
            status.kind === 'sending' ? (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )
          }
        >
          {status.kind === 'sending' ? 'Sending' : 'Send message'}
        </Button>

        {!configured && mailto && (
          <a
            href={mailto}
            className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-[15px] font-semibold text-fg transition-colors hover:border-cyan/50"
          >
            Open in my email app
          </a>
        )}
      </div>

      <div aria-live="polite" className="min-h-[1.5rem]">
        {status.kind === 'sent' && (
          <p className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] p-4 text-sm text-emerald-100">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Message sent. Thank you, I'll get back to you soon.
          </p>
        )}
        {status.kind === 'error' && (
          <p className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/[0.08] p-4 text-sm text-rose-100">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
