import { CSSProperties } from "react";
import Container from "../../shared/ui/Container";
import { storeBenefits } from "../constants/home.helper";

export default function StoreBenefits() {
  return (
    <Container>
      <ul className="grid gap-3 md:grid-cols-3">
        {storeBenefits.map(({ icon: Icon, title, text, strong, soft, badge, tags }) => (
          <li
            key={title}
            style={{ "--tone": strong, "--tone-soft": soft } as CSSProperties}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border-b-4 border-(--tone)
              bg-(--tone-soft) p-5 transition-shadow hover:shadow-card-hover"
          >
            <span
              aria-hidden
              className="absolute right-0 top-0 h-24 w-28 bg-[radial-gradient(var(--tone)_1.5px,transparent_1.5px)]
                bg-size-[12px_12px] opacity-25 [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
            />
            <Icon aria-hidden size={96} className="absolute -bottom-5 -right-4 text-(--tone) opacity-10" />

            <div className="relative flex items-start justify-between gap-3">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-(--tone) text-white
                  shadow-[0_8px_16px_-8px_var(--tone)] transition-transform duration-300 group-hover:-rotate-12
                  group-hover:scale-110"
              >
                <Icon size={21} />
              </span>
              <span className="rounded-full bg-(--tone) px-2.5 py-1 text-[0.7rem] font-extrabold uppercase text-white">
                {badge}
              </span>
            </div>

            <div className="relative">
              <p className="text-lg font-extrabold text-ink">{title}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{text}</p>
            </div>

            <ul className="relative flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <li
                  key={tag}
                  className="rounded-full bg-base-100 px-2.5 py-1 text-xs font-bold text-(--tone) shadow-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
}
