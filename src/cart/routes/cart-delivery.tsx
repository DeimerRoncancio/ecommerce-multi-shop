import { useNavigate } from "react-router";
import { useStepsStorage } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { FaPlus } from "react-icons/fa6";
import AddressItem from "../components/AddressItem";
import { useState } from "react";
import { AddressType } from "../types/cart";
import { useOrderStorage } from "../storage/orders";

const addresses = [
  {
    id: 1,
    name: "Officina Principal",
    addressLine1: "Sm 19, Mz 4, Cs 3",
    addressLine2: "San Antonio",
    city: "Villavicencio",
    state: "Meta",
    country: "Colombia",
    phone: "+57 317-4258628",
  },
  {
    id: 2,
    name: "Casa",
    addressLine1: "Cr 72, Cll 13, No. 14-45",
    addressLine2: "Centro",
    city: "Bogotá",
    state: "Cundinamarca",
    country: "Colombia",
    phone: "+57 300-1234567",
  },
]

export default function CartDelivery() {
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const { order, addAddress } = useOrderStorage();
  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const handleAddressSelect = (address: AddressType) => setSelectedAddress(address);

  const onContinue = () => {
    addAddress(selectedAddress!);
    nextSteps("Entrega");
    navigate("/cart/payment");
  }

  return (
    <div className="flex gap-10 justify-center mt-8 mb-15">
      <div className="w-[55%] max-w-[850px] min-w-[600px]">
        <div className="flex justify-between">
          <h1 className="text-[#333333] text-xl">Dirección de envío</h1>
          <button className="btn bg-[#ffccb4] hover:bg-[#ffc0a3] text-[#f14913] btn-sm max-w-max border-none shadow-none
          focus-visible:outline-none">
            <FaPlus size={16} />
            Agregar nueva dirección
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {addresses.map((address) => {
            return (
              <AddressItem
                key={address.id}
                isActive={!selectedAddress
                  ? order.address.id === address.id
                  : address.id === selectedAddress?.id}
                address={address}
                onSelect={handleAddressSelect}
              />
            );
          })}
        </div>
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
