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
      <div className="btn gap-2 px-3 w-36 h-9 rounded-full bg-cream text-sm font-normal border-none 
      justify-normal"/>
    ) : (
      !user.name.length
        ? (
          <button className="btn h-9 w-36 justify-normal gap-2 rounded-full border-none bg-brand-soft
            px-3 text-sm font-normal text-secondary-content shadow-none" onClick={logIn}>
            <IoMdLogOut size={17} />
            Iniciar sesión
          </button>
        ) : (
          <LogoutActionButton className="btn gap-2 px-3 w-36 h-9 rounded-full bg-brand-soft text-sm font-normal 
          text-brand border-none justify-normal">
            <BiLogOutCircle size={17} />
            Cerrar sesión
          </LogoutActionButton>
        )
    )
  )
}
