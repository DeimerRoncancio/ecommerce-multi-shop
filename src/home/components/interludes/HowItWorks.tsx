import Container from "../../../shared/ui/Container";
import { purchaseSteps } from "../../constants/home.helper";

export default function HowItWorks() {
  return (
    <section className="bg-ink text-white">
      <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_2.4fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-brand">Así de fácil</p>
          <h2 className="mt-1 text-3xl font-extrabold">Comprar en Multi Shop</h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {purchaseSteps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative flex gap-4 border border-white/15 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs font-bold text-white/60">Paso {index + 1}</p>
                <p className="text-lg font-extrabold">{title}</p>
                <p className="mt-1 text-sm text-white/75">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
