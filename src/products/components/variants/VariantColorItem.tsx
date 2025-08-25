export default function VariantColorItem({ value }: { value: string }) {
  return (
    <button
      key={value}
      className={`w-8 h-8 rounded-full hover:scale-110 cursor-pointer transition-all duration-300`}
      style={{ backgroundColor: value }}
    />
  );
}
