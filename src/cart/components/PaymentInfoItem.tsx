import { LiaDollarSignSolid } from "react-icons/lia";

type PaymentInfoItemProps = {
  isMain: boolean,
  label: string,
  value: number,
}

export default function PaymentInfoItem({ isMain, label, value }: PaymentInfoItemProps) {
  return (
    <div className={`flex justify-between p-1 px-4 ${isMain && 'bg-[#f3e2e2c9] gap-1 font-semibold'}`}>
      <p >{label}</p>
      <p className="flex items-center">
        <LiaDollarSignSolid color="#5a5a5a" size={17} />
        {new Intl.NumberFormat("es-ES").format(value)}
      </p>
    </div>
  )
}
