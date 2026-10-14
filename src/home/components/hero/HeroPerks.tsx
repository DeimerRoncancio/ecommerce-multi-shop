import { heroCoupon, heroPerks } from "../../constants/home.helper";

export default function HeroPerks() {
  return (
    <section
      className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-xl border border-line bg-base-100
        px-5 py-4 sm:px-7"
    >
      <ul className="flex flex-wrap gap-y-3 sm:divide-x sm:divide-line">
        {heroPerks.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 pr-6 sm:px-6 sm:first:pl-0">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
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
        <b className="rounded-full bg-ink px-4 py-1.5 font-extrabold tracking-[0.08em] text-white">{heroCoupon.code}</b>
      </p>
    </section>
  );
}
