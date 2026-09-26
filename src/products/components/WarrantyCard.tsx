import { FiRefreshCw, FiShield, FiZap } from "react-icons/fi";

const items = [
  { icon: FiZap, title: "Envío rápido", text: "Gratis en 2 días hábiles" },
  { icon: FiShield, title: "1 año de garantía", text: "Cobertura completa" },
  { icon: FiRefreshCw, title: "30 días de devolución", text: "Sin preguntas" },
];

export function WarrantyCard() {
  return (
    <div className="mt-2 rounded-2xl border border-line bg-cream p-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand">
              <Icon size={22} />
            </span>
            <p className="font-medium text-ink">{title}</p>
            <p className="text-sm text-ink-muted">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
