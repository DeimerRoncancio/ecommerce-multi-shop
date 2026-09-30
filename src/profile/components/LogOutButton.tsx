import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router";
import { UserTypes } from "../types/user.ts";
import LogoutActionButton from "./LogoutActionButton.tsx";
import { BiLogOutCircle } from "react-icons/bi";

type LogInOutButtonProps = {
  user: UserTypes
  loading: boolean
}

export default function LogoutButton({ loading, user }: LogInOutButtonProps) {
  const navigate = useNavigate();
  const logIn = () => navigate("/login");

  return (
    loading ? (
      <div className="btn gap-2 px-4 whitespace-nowrap h-9 rounded-full bg-cream text-sm font-normal border-none
      justify-normal"/>
    ) : (
      !user.name.length
        ? (
          <button className="mt-1 flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-brand px-4 text-sm
            font-bold text-white transition-colors hover:bg-ink" onClick={logIn}>
            <IoMdLogOut size={17} />
            Iniciar sesión
          </button>
        ) : (
          <LogoutActionButton className="mt-1 flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border
          border-brand/30 bg-base-100 px-3.5 text-xs font-bold text-brand transition-colors hover:border-brand
          hover:bg-brand hover:text-white">
            <BiLogOutCircle size={17} />
            Cerrar sesión
          </LogoutActionButton>
        )
    )
  )
}
