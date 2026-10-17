import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle, FiMapPin } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import TextField from "../../shared/ui/TextField";
import useScrollLock from "../../shared/hooks/useScrollLock";
import { AddressData, AddressDataForm } from "../../cart/zod/routesCart";
import { addressFields } from "../../cart/constants/checkout.helper";
import { SavedAddress } from "../types/address";

type AddressFormModalProps = {
  isOpen: boolean;
  address: SavedAddress | null;
  defaultPhone?: string;
  isSaving: boolean;
  error?: string;
  onClose: () => void;
  onSave: (form: AddressDataForm) => void;
};

const valuesOf = (address: SavedAddress | null, defaultPhone?: string): AddressDataForm => ({
  name: address?.addressName ?? "",
  addressLine1: address?.address ?? "",
  city: address?.city ?? "",
  state: address?.state ?? "",
  country: address?.country ?? "Colombia",
  phone: address?.addressNumber ?? defaultPhone ?? "",
});

export default function AddressFormModal({
  isOpen,
  address,
  defaultPhone,
  isSaving,
  error,
  onClose,
  onSave,
}: AddressFormModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const titleId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddressDataForm>({ resolver: zodResolver(AddressData), mode: "onChange" });

  useEffect(() => setIsMounted(true), []);
  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) reset(valuesOf(address, defaultPhone));
  }, [isOpen, address]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-150 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border-t-4
          border-brand bg-base-100 text-ink shadow-card-hover transition-transform duration-150 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
      >
        <form noValidate onSubmit={handleSubmit(onSave)}>
          <header className="flex items-start gap-3.5 px-5 pb-2 pt-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <FiMapPin size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-lg font-extrabold leading-tight">
                {address ? "Editar dirección" : "Nueva dirección"}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">La usaremos para llenar la entrega de tus compras.</p>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft
                transition-colors hover:bg-cream hover:text-ink"
            >
              <IoCloseOutline size={22} />
            </button>
          </header>

          <div className="flex flex-col gap-3.5 px-5 py-3">
            {error && (
              <p
                role="alert"
                className="flex items-center gap-2.5 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm
                  font-semibold text-error"
              >
                <FiAlertCircle size={17} className="shrink-0" />
                {error}
              </p>
            )}
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-6">
              {addressFields.map(field => (
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
          </div>

          <footer className="flex justify-end gap-2.5 border-t border-line px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors
                hover:border-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink
                disabled:bg-base-300 disabled:text-ink-muted"
            >
              {isSaving ? "Guardando…" : "Guardar dirección"}
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}
