import { Link } from "react-router";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "terciary" | "inverse";
};

const themes = {
  primary: "text-ink-soft hover:text-action",
  secondary: "text-ink-muted hover:text-action",
  terciary: "text-action hover:text-action-dark",
  inverse: "text-white/60 hover:text-sun",
};

export default function CustomLink({ to, children, theme = "primary" }: CustomLinkProps) {
  return (
    <Link to={to} className={`transition-colors duration-200 ${themes[theme]}`}>
      {children}
    </Link>
  );
}
