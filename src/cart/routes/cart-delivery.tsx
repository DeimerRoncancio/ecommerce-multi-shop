import { redirect, useFetcher, useNavigate } from "react-router";
import Container from "../../shared/ui/Container";
import { useStepsStorage } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { FiInfo, FiPlus } from "react-icons/fi";
import AddressItem from "../components/AddressItem";
import NewAddressForm from "../components/NewAddressForm";
import { useEffect, useState } from "react";
import type { AddressType } from "../types/cart";
import type { Route } from "./+types/cart-delivery";
import { parse } from "cookie";
import Cookie from "js-cookie";
import { getSession } from "../../sessions.server";
import {
  getCheckoutAccessToken,
  getSavedAddresses,
  updateTransactionCustomer,
} from "../api/paymentsApi";
import {
  checkoutCustomerAddressesToAddresses,
  checkoutToCustomerTransaction,
} from "../mappers/customer.mapper";
import { SnackbarUtilities } from "../../shared/utilities/snackbar-manager";

export async function loader({ request }: Route.LoaderArgs) {
  const cookies = parse(request.headers.get("Cookie") || "");
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("checkoutUser");
  if (!user) return redirect("/cart/user-data");
  if (!cookies.transactionId) return redirect("/cart");

  const token = (session.get("token") as string | undefined) ?? null;

  const savedAddresses = token ? await getSavedAddresses(token) : [];
  const addresses = checkoutCustomerAddressesToAddresses(savedAddresses);

  return { user, addresses, isLoggedIn: token !== null };
}

export async function action({ request }: Route.ActionArgs) {
  const { transactionId } = parse(request.headers.get("Cookie") || "");
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token") as string | undefined;
  const { checkoutAccessToken, customer } = await request.json();

  if (!transactionId) return { ok: false as const };

  return updateTransactionCustomer(transactionId, checkoutAccessToken, customer, token)
    .then((guestEmail) => ({ ok: true as const, guestEmail }))
    .catch(() => ({ ok: false as const }));
}

export default function CartDelivery({ loaderData }: Route.ComponentProps) {
  const { user, addresses: savedAddresses, isLoggedIn } = loaderData;
  const [newAddresses, setNewAddresses] = useState<AddressType[]>([]);
  const [showForm, setShowForm] = useState(savedAddresses.length === 0);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();

  const addresses = [...savedAddresses, ...newAddresses];

  const handleAddressSelect = (address: AddressType) =>
    setSelectedAddress(address);

  const handleNewAddress = (address: AddressType) => {
    setNewAddresses((current) => [...current, address]);
    setSelectedAddress(address);
    setShowForm(false);
  };

  const onContinue = () => {
    const transactionId = Cookie.get("transactionId");
    const checkoutAccessToken = getCheckoutAccessToken();
    if (!selectedAddress) return;
    if (!transactionId || !checkoutAccessToken) return navigate("/cart");

    fetcher.submit(
      JSON.stringify({ checkoutAccessToken, customer: checkoutToCustomerTransaction(user, selectedAddress) }),
      { method: "post", encType: "application/json" },
    );
  };

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (!fetcher.data.ok) return SnackbarUtilities.error("No pudimos guardar la entrega. Inténtalo de nuevo.");

    if (fetcher.data.guestEmail) sessionStorage.setItem("guestEmail", fetcher.data.guestEmail);
    nextSteps("Entrega");
    navigate("/cart/payment");
  }, [fetcher.state, fetcher.data]);

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_380px] lg:gap-12">
      <section>
        <h1 className="text-3xl font-extrabold text-ink">Entrega</h1>
        <p className="mt-0.5 text-sm text-ink-muted">Elige dónde quieres recibir tu pedido. El envío es gratis.</p>

        {!isLoggedIn && (
          <p className="mt-4 flex items-center gap-3 rounded-lg bg-cream px-3.5 py-2 text-sm text-ink-soft">
            <FiInfo size={17} className="shrink-0 text-ink-muted" />
            Como invitado, la dirección solo se usa para este pedido y no queda guardada.
          </p>
        )}

        {showForm && (
          <NewAddressForm
            defaultPhone={user.phone}
            onSave={handleNewAddress}
            onCancel={addresses.length > 0 ? () => setShowForm(false) : undefined}
          />
        )}

        {addresses.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {addresses.map((address) => {
              return (
                <AddressItem
                  key={address.id}
                  isActive={address.id === selectedAddress?.id}
                  address={address}
                  onSelect={handleAddressSelect}
                />
              );
            })}
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="group flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border-2
                  border-dashed border-line p-5 text-sm font-bold text-ink-soft transition-colors hover:border-brand
                  hover:bg-brand-soft/50 hover:text-brand"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cream transition-colors
                  group-hover:bg-brand group-hover:text-white">
                  <FiPlus size={18} />
                </span>
                Agregar otra dirección
              </button>
            )}
          </div>
        )}
      </section>

      <PaymentCardInfo
        onContinue={onContinue}
        disabledContinue={!selectedAddress || fetcher.state !== "idle"}
      />
    </Container>
  );
}
