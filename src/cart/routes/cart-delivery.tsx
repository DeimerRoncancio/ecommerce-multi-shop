import { redirect, useNavigate } from "react-router";
import Container from "../../shared/ui/Container";
import { useStepsStorage } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { FaPlus } from "react-icons/fa6";
import AddressItem from "../components/AddressItem";
import NewAddressForm from "../components/NewAddressForm";
import { useState } from "react";
import type { AddressType, CheckoutUserData } from "../types/cart";
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

export async function loader({ request }: Route.LoaderArgs) {
  const cookies = parse(request.headers.get("Cookie") || "");
  if (!cookies.userData) return redirect("/cart/user-data");
  if (!cookies.transactionId) return redirect("/cart");

  const user: CheckoutUserData = JSON.parse(cookies.userData);

  const session = await getSession(request.headers.get("Cookie"));
  const token = (session.get("token") as string | undefined) ?? null;

  const savedAddresses = token ? await getSavedAddresses(token) : [];
  const addresses = checkoutCustomerAddressesToAddresses(savedAddresses);

  return { user, addresses, token };
}

export default function CartDelivery({ loaderData }: Route.ComponentProps) {
  const { user, addresses: savedAddresses, token } = loaderData;
  const [newAddresses, setNewAddresses] = useState<AddressType[]>([]);
  const [showForm, setShowForm] = useState(savedAddresses.length === 0);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const addresses = [...savedAddresses, ...newAddresses];

  const handleAddressSelect = (address: AddressType) =>
    setSelectedAddress(address);

  const handleNewAddress = (address: AddressType) => {
    setNewAddresses((current) => [...current, address]);
    setSelectedAddress(address);
    setShowForm(false);
  };

  const onContinue = async () => {
    const transactionId = Cookie.get("transactionId");
    const checkoutAccessToken = getCheckoutAccessToken();
    if (!selectedAddress) return;
    if (!transactionId || !checkoutAccessToken) return navigate("/cart");

    const data = await updateTransactionCustomer(
      transactionId,
      checkoutAccessToken,
      checkoutToCustomerTransaction(user, selectedAddress),
      token ?? undefined,
    );

    if (data) sessionStorage.setItem("guestEmail", data);

    nextSteps("Entrega");
    navigate("/cart/payment");
  };

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_360px]">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-xl font-semibold text-ink">Dirección de envío</h1>
          {!showForm && (
            <button
              type="button"
              className="btn btn-sm gap-2 rounded-xl border-0 bg-brand-soft text-secondary-content
                shadow-none hover:bg-brand hover:text-primary-content"
              onClick={() => setShowForm(true)}
            >
              <FaPlus size={16} />
              Agregar nueva dirección
            </button>
          )}
        </div>

        {!token && (
          <p className="mt-4 rounded-xl border border-line bg-base-100 p-4 text-sm text-ink-soft">
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          </div>
        )}
      </section>

      <PaymentCardInfo
        onContinue={onContinue}
        disabledContinue={!selectedAddress}
      />
    </Container>
  );
}
