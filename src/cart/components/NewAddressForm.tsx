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
      className="mt-6 text-sm border border-[#dedfdf] rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4 p-5">
        {fields.map((field) => (
          <div key={field.name} className={field.wide ? "col-span-2" : ""}>
            <span className="text-[#5e472d]">{field.label}</span>
            <input
              type="text"
              placeholder={field.placeholder}
              className="p-3 pl-4 mt-3 border-2 border-[#dedfdf] rounded-xl outline-0 w-full focus:outline-3
              focus:outline-[#ffc1ad] focus:border-[#f14913]"
              {...register(field.name)}
            />
            {errors[field.name] && (
              <span className="text-red-500">{errors[field.name]?.message}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 px-5 pb-5">
        <button
          type="submit"
          disabled={!isValid}
          className="btn bg-[#ffccb4] hover:bg-[#ffc0a3] text-[#f14913] btn-sm border-none shadow-none"
        >
          Usar esta dirección
        </button>
        {onCancel && (
          <button type="button" className="btn btn-sm shadow-none" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
