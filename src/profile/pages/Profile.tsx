import { useOutletContext } from "react-router"
import { UserTypes } from "../types/user";
import UserDataField from "../components/UserDataField";

type userContext = {
  user: UserTypes,
  userLoading: boolean
}

export default function Profile() {
  const { user, userLoading: loading } = useOutletContext<userContext>();

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-[#5e472d]">Información de tu cuenta</h2>
        <button className={`btn btn-neutral btn-outline`}>
          {
            'Editar'
          }
        </button>
      </div>
      <div className="text-base text-black grid grid-cols-2 gap-5">
          <UserDataField fieldName={"Nombres(s)"} data={ user.name + ' ' + user.secondName } />
          <UserDataField fieldName={"Apellido(s)"} data={ user.lastnames } />
          <UserDataField fieldName={"Email"} data={ user.email } />
          <UserDataField fieldName={"Numero de telefono"} data={ user.phoneNumber?.toString() } />
      </div>
    </>
  )
}
