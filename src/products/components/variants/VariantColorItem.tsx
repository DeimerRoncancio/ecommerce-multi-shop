type Props = {
  color: string;
  colorSelected: string | null;
  pickColor: (color: string) => void;
}

export default function VariantColorItem({ color, colorSelected, pickColor }: Props) {
  return (
    <button
      key={color}
      onClick={() => pickColor(color)}
      className={`w-8 h-8 rounded-full hover:scale-110 cursor-pointer transition-all duration-300 
      ${colorSelected === color ? "ring-2 ring-offset-2 ring-[#364153]" : ""}`}
      style={{ backgroundColor: color }}
    />
  );
}
