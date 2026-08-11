import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) =>
  cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20',
    {
      'bg-brand-600 text-white shadow-[0_10px_28px_rgba(255,204,0,.2)] hover:bg-brand-500 dark:text-slate-950':
        variant === 'primary',
      'border bg-[var(--surface)] text-[var(--text)] hover:border-brand-500/50 hover:bg-brand-500/5':
        variant === 'secondary',
      'text-[var(--text-soft)] hover:bg-brand-500/8 hover:text-[var(--text)]': variant === 'ghost',
      'bg-red-500/10 text-red-500 hover:bg-red-500/18': variant === 'danger',
      'h-9 px-3 text-xs': size === 'sm',
      'h-11 px-4 text-sm': size === 'md',
      'h-12 px-5 text-sm': size === 'lg',
    },
    className,
  );

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
