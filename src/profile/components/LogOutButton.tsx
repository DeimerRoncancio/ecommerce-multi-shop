import { BiLogOutCircle } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { Form, useNavigate } from "react-router";
import { UserTypes } from "../types/user";

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
          <Form method="post" action="/logout-action">
            <button className="btn gap-2 px-3 w-36 h-9 rounded-full bg-[#fff4ef] text-sm font-normal text-[#eb5324] 
            border-none justify-normal" value={location.pathname} name="from">
              <BiLogOutCircle size={17} />
              Cerrar Sesión
            </button>
          </Form>
        )
    )
  )
}
