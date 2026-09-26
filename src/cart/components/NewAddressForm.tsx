import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressData, AddressDataForm } from "../zod/routesCart";
import { AddressType } from "../types/cart";

type Props = {
  defaultPhone?: string;
  onSave: (address: AddressType) => void;
  onCancel?: () => void;
};

const fields: Array<{
  name: keyof AddressDataForm;
  label: string;
  placeholder: string;
  wide?: boolean;
}> = [
  { name: "name", label: "Nombre de la dirección", placeholder: "Casa, Oficina..." },
  { name: "phone", label: "Teléfono de contacto", placeholder: "3001234567" },
  { name: "addressLine1", label: "Dirección", placeholder: "Calle 12 # 34-56, apto 101", wide: true },
  { name: "city", label: "Ciudad", placeholder: "Bogotá" },
  { name: "state", label: "Departamento", placeholder: "Cundinamarca" },
  { name: "country", label: "País", placeholder: "Colombia" },
];

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
    <form
      className="mt-6 rounded-2xl border border-line bg-base-100 text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 p-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.wide ? "col-span-2" : ""}>
            <span className="font-medium text-ink">{field.label}</span>
            <input
              type="text"
              placeholder={field.placeholder}
              className="mt-2 w-full rounded-xl border border-line bg-base-100 p-3 px-4 text-ink
                outline-none transition-colors placeholder:text-ink-muted focus:border-brand"
              {...register(field.name)}
            />
            {errors[field.name] && (
              <span className="mt-1 block text-xs text-error">{errors[field.name]?.message}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 border-t border-line px-5 py-4">
        <button
          type="submit"
          disabled={!isValid}
          className="btn gap-2 rounded-xl border-0 bg-brand text-primary-content shadow-none
            hover:bg-brand-dark disabled:bg-base-300 disabled:text-ink-muted"
        >
          Usar esta dirección
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn rounded-xl border border-line bg-base-100 text-ink shadow-none hover:bg-cream"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
