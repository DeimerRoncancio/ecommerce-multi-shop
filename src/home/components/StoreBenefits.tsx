import Container from "../../shared/ui/Container";
import { storeBenefits } from "../constants/home.helper";

export default function StoreBenefits() {
  return (
    <Container>
      <ul className="grid border-l border-t border-line sm:grid-cols-3">
        {storeBenefits.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 border-b border-r border-line bg-brand-soft p-6">
            <Icon size={26} className="shrink-0 text-brand" />
            <div>
              <p className="font-extrabold text-ink">{title}</p>
              <p className="mt-1 text-sm text-ink-soft">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
