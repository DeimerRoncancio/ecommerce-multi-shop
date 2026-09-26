import { FieldErrors, FieldValues } from "react-hook-form";

type ErrorMessageProps<T extends FieldValues> = {
  fieldName: keyof T;
  errors: FieldErrors<T>;
};

export default function ErrorMessage<T extends FieldValues>({
  fieldName,
  errors,
}: ErrorMessageProps<T>) {
  const error = errors[fieldName];
  if (error && typeof error.message === "string") {
    return <span className="text-xs text-error">{error.message}</span>;
  }
  return null;
}
