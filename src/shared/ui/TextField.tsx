import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  icon?: IconType;
  trailing?: ReactNode;
  requiredMark?: boolean;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, icon: Icon, trailing, requiredMark, id, name, className, ...props }, ref) => {
    const fieldId = id ?? `campo-${name}`;

    return (
      <div className={className}>
        <label htmlFor={fieldId} className="text-xs font-bold text-ink">
          {label}
          {requiredMark && <span className="ml-0.5 text-brand">*</span>}
        </label>
        <div className="relative mt-1">
          {Icon && (
            <Icon
              size={16}
              aria-hidden
              className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${
                error ? "text-error" : "text-ink-muted"
              }`}
            />
          )}
          <input
            ref={ref}
            id={fieldId}
            name={name}
            aria-invalid={error ? true : undefined}
            className={`h-10 w-full rounded-lg border bg-base-100 text-sm text-ink outline-none transition-colors
              placeholder:text-ink-muted hover:border-ink-muted focus:border-brand focus:ring-4 focus:ring-brand/15 ${
                Icon ? "pl-10" : "pl-3.5"
              } ${trailing ? "pr-11" : "pr-3.5"} ${
                error ? "border-error focus:border-error focus:ring-error/15" : "border-line"
              }`}
            {...props}
          />
          {trailing && <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>}
        </div>
        {error ? (
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-error">
            <FiAlertCircle size={13} />
            {error}
          </p>
        ) : (
          hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
