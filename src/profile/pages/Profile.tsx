import { useOutletContext } from "react-router"
import { UserTypes } from "../types/user";
import UserDataField from "../components/UserDataField";
import UserDataRadio from "../components/UserDataRadio";

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
      </div>
      {
        !loading ? (
          <form>
            <div className="text-base text-black grid grid-cols-2 gap-5">
              <UserDataField fieldName={"Nombres(s)"} data={user.name + ' ' + user.secondName} />
              <UserDataField fieldName={"Apellido(s)"} data={user.lastnames} />
              <UserDataField fieldName={"Email"} data={user.email} />
              <UserDataField fieldName={"Numero de telefono"} data={user.phoneNumber?.toString()} />
              <UserDataRadio data={user.gender} />
            </div>
            <button className="btn mt-7 mr-3 p-1 px-7 h-9 btn-neutral">Actualizar datos</button>
            <button className="btn mt-7 p-1 px-6 h-9">Reestablecer datos</button>
          </form>
        ) : (
          <div className="w-full mt-28 flex justify-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )
      }
    </>
  )
}
