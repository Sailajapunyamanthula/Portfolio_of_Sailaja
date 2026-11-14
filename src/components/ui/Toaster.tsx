import { useEffect, useState } from 'react';
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import { subscribeToasts, type ToastMessage, type ToastTone } from '../../lib/toast';
import { cn } from '../../lib/cn';

const toneStyles: Record<ToastTone, string> = {
  info: 'border-cyan/30',
  success: 'border-emerald-400/40',
  error: 'border-rose-400/40',
};

const toneIcon: Record<ToastTone, typeof Info> = {
  info: Info,
  success: CircleCheck,
  error: CircleAlert,
};

const toneIconColor: Record<ToastTone, string> = {
  info: 'text-cyan',
  success: 'text-emerald-300',
  error: 'text-rose-300',
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(
    () =>
      subscribeToasts((toast) => {
        setToasts((current) => [...current.slice(-2), toast]);
        window.setTimeout(() => setToasts((current) => current.filter((t) => t.id !== toast.id)), 7000);
      }),
    [],
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[150] flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => {
        const Icon = toneIcon[toast.tone];
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex max-w-md animate-modal-in items-start gap-3 rounded-2xl border bg-ink-700/95 px-4 py-3 text-sm text-fg shadow-2xl backdrop-blur-xl',
              toneStyles[toast.tone],
            )}
          >
            <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', toneIconColor[toast.tone])} aria-hidden="true" />
            <p className="leading-relaxed">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
              className="-mr-1 ml-1 rounded-full p-1 text-fg-mute transition-colors hover:text-fg"
              aria-label="Dismiss message"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
