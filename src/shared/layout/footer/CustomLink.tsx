import { Link } from "react-router";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "terciary";
};

const themes = {
  primary: "text-ink-soft hover:text-brand",
  secondary: "text-ink-muted hover:text-brand",
  terciary: "text-brand hover:text-brand-dark",
};

export default function CustomLink({ to, children, theme = "primary" }: CustomLinkProps) {
  return (
    <Link to={to} className={`transition-colors duration-200 ${themes[theme]}`}>
      {children}
    </Link>
  );
}
