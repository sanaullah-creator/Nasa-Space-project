import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cx } from '../../utils/format';
import { passwordStrength } from '../../utils/auth';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string | null;
  hint?: ReactNode;
  icon?: ReactNode;
}

/** Labelled text input with inline error + hint, wired up for screen readers. */
export function FormField({ label, error, hint, icon, className, ...input }: FieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
                    className={cx('input', Boolean(icon) && 'pl-10', error && 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/20')}
          {...input}
        />
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-rose-300" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface PasswordProps extends Omit<FieldProps, 'type'> {
  showStrength?: boolean;
}

/** Password input with show/hide toggle and optional strength meter. */
export function PasswordField({ label, error, hint, showStrength, value, className, ...input }: PasswordProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const str = passwordStrength(String(value ?? ''));
  const describedBy = error ? `${id}-err` : `${id}-hint`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cx('input pr-11', error && 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/20')}
          {...input}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {showStrength && String(value ?? '').length > 0 && (
        <div className="mt-2 flex items-center gap-2" aria-live="polite">
          <div className="flex flex-1 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1.5 flex-1 rounded-full transition-colors" style={{ background: i < Math.max(str.score, 1) ? str.color : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <span className="w-20 text-right text-xs font-semibold" style={{ color: str.color }}>
            {str.label}
          </span>
        </div>
      )}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-rose-300" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
