import { redirect, useNavigate } from "react-router";
import { useStepsStorage } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { FaPlus } from "react-icons/fa6";
import AddressItem from "../components/AddressItem";
import { useState } from "react";
import type { AddressType } from "../types/cart";
import { useOrderStorage } from "../storage/orders";
import type { Route } from "./+types/cart-delivery";
import { parse } from "cookie";
import Cookie from "js-cookie";
import { getCheckoutCustomer, payments } from "../api/paymentsApi";

export async function loader({ request }: Route.LoaderArgs) {
  const cookies = parse(request.headers.get("Cookie") || "");
  if (!cookies.userData) return redirect("/cart/user-data");
  if (!cookies.transactionId) return redirect("/cart");

  const user = JSON.parse(cookies.userData) as {
    names: string;
    lastnames: string;
    email: string;
    phone: string;
  };

  const customer = await getCheckoutCustomer(cookies.transactionId, user.email);
  const addresses: AddressType[] = (customer?.addresses ?? []).map(
    (address, index) => ({
      id: `${address.addressName}-${index}`,
      name: address.addressName,
      addressLine1: address.address,
      addressLine2: "",
      city: address.city,
      state: address.state,
      country: address.country,
      phone: address.addressNumber,
    }),
  );

  return { user, addresses };
}

export default function CartDelivery({ loaderData }: Route.ComponentProps) {
  const { user, addresses } = loaderData;
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null,
  );
  const { order } = useOrderStorage();
  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const handleAddressSelect = (address: AddressType) =>
    setSelectedAddress(address);

  const onContinue = async () => {
    const transactionId = Cookie.get("transactionId");
    if (!transactionId || !selectedAddress) return;

    const { data } = await payments.put(`/add-user/${transactionId}`, {
      userNames: user.names + " " + user.lastnames,
      userEmail: user.email,
      userPhone: user.phone,
      userAddress: {
        addressName: selectedAddress.name,
        address: selectedAddress.addressLine1,
        city: selectedAddress.city,
        state: selectedAddress.state,
        country: selectedAddress.country,
        addressNumber: selectedAddress.phone,
      },
    });

    if (data) sessionStorage.setItem("guestEmail", data);

    nextSteps("Entrega");
    navigate("/cart/payment");
  };

  return (
    <div className="flex gap-10 justify-center mt-8 mb-15">
      <div className="w-[55%] max-w-212.5 min-w-150">
        <div className="flex justify-between">
          <h1 className="text-[#333333] text-xl">Dirección de envío</h1>
          <button className="btn bg-[#ffccb4] hover:bg-[#ffc0a3] text-[#f14913] btn-sm max-w-max border-none shadow-none focus-visible:outline-none">
            <FaPlus size={16} />
            Agregar nueva dirección
          </button>
        </div>

        {addresses.length === 0 ? (
          <p className="mt-6 text-[#636669]">
            No tienes direcciones guardadas.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {addresses.map((address) => {
              return (
                <AddressItem
                  key={address.id}
                  isActive={
                    !selectedAddress
                      ? order.address.id === address.id
                      : address.id === selectedAddress?.id
                  }
                  address={address}
                  onSelect={handleAddressSelect}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="w-[25%]">
        <PaymentCardInfo
          onContinue={onContinue}
          disabledContinue={!order.address && !selectedAddress}
        />
      </div>
    </div>
  );
}
