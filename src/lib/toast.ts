export type ToastTone = 'info' | 'success' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  tone: ToastTone;
}

type Listener = (toast: ToastMessage) => void;

const listeners = new Set<Listener>();
let nextId = 0;

export function showToast(message: string, tone: ToastTone = 'info'): void {
  const toast: ToastMessage = { id: ++nextId, message, tone };
  listeners.forEach((listener) => listener(toast));
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
