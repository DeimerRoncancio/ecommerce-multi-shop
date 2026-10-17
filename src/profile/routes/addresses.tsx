import { useEffect, useState } from "react";
import { useFetcher, useOutletContext } from "react-router";
import { FiPlus } from "react-icons/fi";
import type { Route } from "./+types/addresses";
import { getSession } from "../../sessions.server";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../services/addresses.api";
import { SavedAddress, SavedAddressRequest } from "../types/address";
import { UserTypes } from "../types/user";
import { AddressDataForm } from "../../cart/zod/routesCart";
import { SnackbarUtilities } from "../../shared/utilities/snackbar-manager";
import AddressCard from "../components/AddressCard";
import AddressFormModal from "../components/AddressFormModal";

type AddressAction = { intent: "save"; id?: string; address: SavedAddressRequest } | { intent: "delete"; id: string };

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token") as string;

  return getAddresses(token)
    .then(addresses => ({ addresses, failed: false }))
    .catch(() => ({ addresses: [] as SavedAddress[], failed: true }));
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token") as string;
  const body = (await request.json()) as AddressAction;

  if (body.intent === "delete")
    return deleteAddress(token, body.id)
      .then(() => ({ ok: true as const, intent: body.intent, message: "Dirección quitada" }))
      .catch(() => ({ ok: false as const, intent: body.intent, error: "No pudimos quitar la dirección." }));

  const request$ = body.id ? updateAddress(token, body.id, body.address) : createAddress(token, body.address);
  return request$
    .then(() => ({ ok: true as const, intent: body.intent, message: "Dirección guardada" }))
    .catch(error => ({
      ok: false as const,
      intent: body.intent,
      error:
        error.response?.status === 409
          ? "Ya tienes una dirección con ese nombre. Usa otro."
          : "No pudimos guardar la dirección. Inténtalo de nuevo.",
    }));
}

const toRequest = (form: AddressDataForm): SavedAddressRequest => ({
  addressName: form.name.trim(),
  address: form.addressLine1.trim(),
  city: form.city.trim(),
  state: form.state.trim(),
  country: form.country.trim(),
  addressNumber: form.phone.trim(),
});

export default function Addresses({ loaderData }: Route.ComponentProps) {
  const { addresses, failed } = loaderData;
  const { user } = useOutletContext<{ user: UserTypes }>();
  const fetcher = useFetcher<typeof action>();
  const [editing, setEditing] = useState<SavedAddress | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState<string>();
  const isBusy = fetcher.state !== "idle";
  const count = addresses.length;

  const openForm = (address: SavedAddress | null) => {
    setEditing(address);
    setFormError(undefined);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  const send = (payload: AddressAction) =>
    fetcher.submit(JSON.stringify(payload), { method: "post", encType: "application/json" });

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;
    const result = fetcher.data;

    if (result.ok) {
      SnackbarUtilities.success(result.message);
      if (result.intent === "save") closeForm();
      return;
    }

    if (result.intent === "save") setFormError(result.error);
    else SnackbarUtilities.error(result.error);
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-ink">Direcciones</h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            {count
              ? `${count} ${count === 1 ? "dirección guardada" : "direcciones guardadas"}. Las usamos para llenar la entrega de tus compras.`
              : "Guarda tus direcciones y elige una con un clic al pagar."}
          </p>
        </div>
        {count > 0 && (
          <button
            type="button"
            onClick={() => openForm(null)}
            className="flex h-10 items-center gap-2 rounded-full bg-brand px-5 text-sm font-bold text-white
              transition-colors hover:bg-ink"
          >
            <FiPlus size={16} />
            Agregar dirección
          </button>
        )}
      </div>

      {failed ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <img src="/images/list-empty.png" alt="" width={110} />
          <p className="text-xl font-bold text-ink">No pudimos cargar tus direcciones</p>
          <p className="max-w-sm text-ink-muted">Recarga la página en unos minutos.</p>
        </div>
      ) : !count ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <img src="/images/box-empty.png" alt="" width={140} />
          <p className="text-xl font-bold text-ink">Aún no tienes direcciones</p>
          <p className="max-w-sm text-ink-muted">
            Agrega tu casa, tu oficina o donde quieras recibir tus pedidos. También se guardan al pagar.
          </p>
          <button
            type="button"
            onClick={() => openForm(null)}
            className="flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white
              transition-colors hover:bg-ink"
          >
            <FiPlus size={16} />
            Agregar dirección
          </button>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              disabled={isBusy}
              onEdit={openForm}
              onDelete={({ id }) => send({ intent: "delete", id })}
            />
          ))}
          <li>
            <button
              type="button"
              onClick={() => openForm(null)}
              className="group flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl
                border-2 border-dashed border-line p-5 text-sm font-bold text-ink-soft transition-colors
                hover:border-brand hover:bg-brand-soft/50 hover:text-brand"
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-cream transition-colors
                  group-hover:bg-brand group-hover:text-white"
              >
                <FiPlus size={18} />
              </span>
              Agregar dirección
            </button>
          </li>
        </ul>
      )}

      <AddressFormModal
        isOpen={isFormOpen}
        address={editing}
        defaultPhone={user.phoneNumber ? String(user.phoneNumber) : undefined}
        isSaving={isBusy}
        error={formError}
        onClose={closeForm}
        onSave={form => send({ intent: "save", id: editing?.id, address: toRequest(form) })}
      />
    </>
  );
}
