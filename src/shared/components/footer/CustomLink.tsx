import { Link } from "react-router";

type CustomLinkProps = {
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "terciary"
}

export default function CustomLink({ children, theme = "primary" }: CustomLinkProps) {
  return (
    <Link to="" className={`
    ${theme === "secondary" && "text-[#979086]"}
    ${theme === "terciary" && "text-[#f14a13]"}
    ${theme === "terciary" && "hover:text-[#f14b1381]"}
    text-[#696663] hover:text-[#f14a13] transition-all duration-300`}>
      {children}
    </Link>
  )
}
