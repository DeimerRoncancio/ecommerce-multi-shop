import { useOutletContext } from "react-router";
import { UserTypes } from "../types/user";

type userContext = {
  user: UserTypes,
  userLoading: boolean,
}

export default function ProfileSettings() {
  const { user, userLoading: loading } = useOutletContext<userContext>();
  
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-[#5e472d]">Configuración de cuenta</h2>
      </div>
    </>
  )
}
