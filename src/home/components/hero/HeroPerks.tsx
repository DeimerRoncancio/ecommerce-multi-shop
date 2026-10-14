import { categoryStyle } from "../../../shared/utilities/category-color";
import { heroCoupon, heroPerks } from "../../constants/home.helper";

export default function HeroPerks() {
  return (
    <section
      style={categoryStyle("Tecnología")}
      className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-xl border-t-4 border-(--cat)
        bg-(--cat-soft) px-5 py-4 sm:px-7"
    >
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {heroPerks.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--cat) text-white">
              <Icon size={16} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-ink">{title}</span>
              <span className="block text-xs text-ink-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="flex flex-wrap items-center gap-3 text-sm font-semibold text-ink">
        {heroCoupon.text}
        <b
          className="border-2 border-dashed border-(--cat) bg-white px-3 py-1 font-extrabold tracking-[0.12em]
            text-(--cat)"
        >
          {heroCoupon.code}
        </b>
      </p>
    </section>
  );
}
