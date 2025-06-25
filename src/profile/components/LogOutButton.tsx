import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router";
import { UserTypes } from "../types/user";
import LogoutAction from "../../auth/actions/logout.action";

type LogInOutButtonProps = {
  user: UserTypes
  loading: boolean
}

export default function LogOutButton({ loading, user }: LogInOutButtonProps) {
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/login");
  }

  return (
    loading ? (
      <div className="btn gap-2 px-3 w-36 h-9 rounded-full bg-[#f3f3f3] text-sm font-normal border-none 
      justify-normal"/>
    ) : (
      !user.name.length
        ? (
          <button className="btn gap-2 px-3 w-36 h-9 rounded-full bg-[#ecf1fa] text-sm font-normal text-[#0a4db8] 
          border-none justify-normal" onClick={logIn}>
            <IoMdLogOut size={17} />
            Inciar Sesión
          </button>
        ) : (
          <LogoutAction />
        )
    )
  )
}
