type Props = {
  size: string;
  variantSelected: string | null;
  pickVariant: (size: string) => void;
}

export default function VariantItem({ size, variantSelected, pickVariant }: Props) {
  return (
    <button className="flex items-center justify-center border w-11 h-11 border-gray-300 hover:border-[#eb5821] 
    p-2 rounded cursor-pointer transition-all duration-300"
    style={{
      backgroundColor: size === variantSelected ? '#eb5821' : 'transparent', 
      borderColor: size === variantSelected ? '#eb5821' : '',
      color: size === variantSelected ? 'white' : 'black'
    }} onClick={() => pickVariant(size)}>
      {size.toUpperCase()}
    </button>
  );
}
