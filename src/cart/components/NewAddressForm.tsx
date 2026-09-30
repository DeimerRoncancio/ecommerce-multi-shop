import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressData, AddressDataForm } from "../zod/routesCart";
import { AddressType } from "../types/cart";
import TextField from "../../shared/ui/TextField";
import { addressFields } from "../constants/checkout.helper";

type Props = {
  defaultPhone?: string;
  onSave: (address: AddressType) => void;
  onCancel?: () => void;
};

export default function NewAddressForm({ defaultPhone, onSave, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddressDataForm>({
    resolver: zodResolver(AddressData),
    mode: "onChange",
    defaultValues: { country: "Colombia", phone: defaultPhone ?? "" },
  });

  const onSubmit = (data: AddressDataForm) =>
    onSave({ id: `new-${Date.now()}`, addressLine2: "", ...data });

  return (
    <form className="mt-5 rounded-2xl border border-line p-4 sm:p-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Nueva dirección</h2>
      <div className="grid gap-x-4 gap-y-3 sm:grid-cols-6">
        {addressFields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            className={field.span}
            error={errors[field.name]?.message}
            {...register(field.name)}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="submit"
          disabled={!isValid}
          className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink
            disabled:bg-base-300 disabled:text-ink-muted"
        >
          Usar esta dirección
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-full border border-line px-6 text-sm font-bold text-ink transition-colors hover:border-ink"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
