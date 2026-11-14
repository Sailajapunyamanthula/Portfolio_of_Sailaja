import { useState } from 'react';
import { Download, LoaderCircle } from 'lucide-react';
import { Button } from './Button';
import { downloadResume } from '../../lib/resume';

interface ResumeButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResumeButton({ variant = 'primary', size = 'md', className }: ResumeButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    setBusy(true);
    await downloadResume();
    setBusy(false);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={busy}
      leftIcon={
        busy ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="h-4 w-4" aria-hidden="true" />
        )
      }
    >
      Download resume
    </Button>
  );
}
