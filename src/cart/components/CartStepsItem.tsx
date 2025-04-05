type CartStepsItemProps = {
  isComplete: boolean,
  step: string,
  Icon: React.ElementType
}

export default function CartStepsItem({ isComplete, step, Icon }: CartStepsItemProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <button className={`${isComplete ? 'bg-[#f14913]' : ''} p-1 rounded-full`}>
        <Icon color={`${isComplete ? 'white' : '#9a9a9a'}`} size={25} />
      </button>
      <p className={`${isComplete ? 'text-[#5a5a5a] font-semibold' : 'text-[#9a9a9a] font-sans'}`}>{step}</p>
    </div>
  )
}
