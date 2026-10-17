import { useState } from "react";
import { FiBriefcase, FiEdit2, FiHome, FiMapPin, FiPhone, FiTrash2 } from "react-icons/fi";
import { SavedAddress } from "../types/address";
import { categoryColor } from "../../shared/utilities/category-color";

type AddressCardProps = {
  address: SavedAddress;
  disabled: boolean;
  onEdit: (address: SavedAddress) => void;
  onDelete: (address: SavedAddress) => void;
};

const HOME = /casa|hogar|home|apartamento|apto|depa/;
const WORK = /oficina|trabajo|empresa|work|negocio|local/;

const iconOf = (name: string) => {
  const key = name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (HOME.test(key)) return FiHome;
  if (WORK.test(key)) return FiBriefcase;
  return FiMapPin;
};

const colors = ["ropa", "tecnologia", "deportes", "cocina", "gamer", "comida", "belleza"].map(categoryColor);

const colorOf = (id: string) =>
  colors[[...id].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7) % colors.length];

const formatPhone = (phone: string) => phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");

const iconButton = "grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors disabled:opacity-50";

export default function AddressCard({ address, disabled, onEdit, onDelete }: AddressCardProps) {
  const [confirming, setConfirming] = useState(false);
  const Icon = iconOf(address.addressName);
  const color = colorOf(address.id);

  return (
    <li
      style={{ "--cat": color.strong, "--cat-soft": color.soft } as React.CSSProperties}
      className={`group grid grid-cols-[4.5rem_1fr] overflow-hidden rounded-2xl border bg-base-100
        transition-[border-color,box-shadow] sm:grid-cols-[5.5rem_1fr] ${
          confirming ? "border-error/40" : "border-line hover:border-(--cat) hover:shadow-card-hover"
        }`}
    >
      <div className="relative grid place-items-center overflow-hidden bg-(--cat) text-white">
        <span aria-hidden className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
        <span aria-hidden className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-black/10" />
        <span
          className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30
            transition-transform duration-300 group-hover:scale-110"
        >
          <Icon size={22} />
        </span>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex-1 px-4 pb-2 pt-3.5">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate pt-0.5 text-lg font-extrabold leading-tight text-ink">{address.addressName}</p>
            <div className="-mr-1.5 -mt-1 flex shrink-0 gap-0.5">
              <button
                type="button"
                aria-label={`Editar ${address.addressName}`}
                title="Editar"
                disabled={disabled}
                onClick={() => onEdit(address)}
                className={`${iconButton} hover:bg-(--cat-soft) hover:text-(--cat)`}
              >
                <FiEdit2 size={16} />
              </button>
              <button
                type="button"
                aria-label={`Quitar ${address.addressName}`}
                title="Quitar"
                disabled={disabled}
                onClick={() => setConfirming(true)}
                className={`${iconButton} hover:bg-error/10 hover:text-error`}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {address.address}
            <br />
            {address.city}, {address.state}
            <br />
            <span className="text-ink-muted">{address.country}</span>
          </p>
        </div>

        <div
          className={`flex min-h-11 items-center gap-2 border-t px-4 py-1.5 ${
            confirming ? "border-error/20 bg-error/5" : "border-line"
          }`}
        >
          {confirming ? (
            <>
              <span className="flex-1 text-sm font-semibold text-ink">
                ¿Quitar<span className="hidden sm:inline"> esta dirección</span>?
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onDelete(address)}
                className="h-8 rounded-full bg-error px-3.5 text-xs font-bold text-white transition-colors hover:bg-ink
                  disabled:opacity-50"
              >
                Sí, quitar
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="h-8 rounded-full px-3 text-xs font-bold text-ink-soft transition-colors hover:bg-cream"
              >
                No
              </button>
            </>
          ) : address.addressNumber ? (
            <span className="flex items-center gap-2 text-sm font-semibold text-ink-soft tabular-nums">
              <FiPhone size={14} className="shrink-0 text-(--cat)" />
              {formatPhone(address.addressNumber)}
            </span>
          ) : (
            <span className="text-sm text-ink-muted">Sin teléfono de contacto</span>
          )}
        </div>
      </div>
    </li>
  );
}
