type Props = {
  color: string;
  colorSelected: string | null;
  pickColor: (color: string) => void;
};

export default function VariantColorItem({ color, colorSelected, pickColor }: Props) {
  const isSelected = colorSelected === color;

  return (
    <button
      type="button"
      aria-label={color}
      aria-pressed={isSelected}
      onClick={() => pickColor(color)}
      className={`h-9 w-9 rounded-full border border-line transition-transform hover:scale-110 ${
        isSelected ? "ring-2 ring-brand ring-offset-2" : ""
      }`}
      style={{ backgroundColor: color }}
    />
  );
}
