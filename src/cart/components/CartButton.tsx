import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

type CartButtonProps = {
  totalPrice: number;
  onContinue: () => void;
  disabled?: boolean;
  label?: string;
};

export default function CartButton({ totalPrice, onContinue, disabled, label }: CartButtonProps) {
  // const handleBuyNow = () => {
  //   const session = {
  //     currency: "COP",
  //     items: productsToBuy.map(product => ({
  //       name: product.productName,
  //       price: product.productPrice + "00",
  //       quantity: product.quantity
  //     }))
  //   }

  //   payments.post("", session)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       window.location.href = data.sessionUrl;
  //     });
  // }

  return (
    <button className="btn btn-accent py-5 w-full rounded " disabled={disabled} onClick={onContinue} type="button">
      {label ?? 'Continuar'} / Total
      <p className="flex items-center">
        <PiCurrencyDollarSimpleBold color="#ffd6a7" size={15} />
        {new Intl.NumberFormat("es-ES").format(totalPrice)}
      </p>
    </button>
  )
}
