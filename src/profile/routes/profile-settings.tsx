import { useOutletContext } from "react-router"
import { UserTypes } from "../types/user";
import UserDataField from "../components/UserDataField";

type userContext = {
  user: UserTypes;
  loading: boolean;
}

export default function ProfileSettings() {
  const { loading } = useOutletContext<userContext>();

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-[#5e472d]">Configuración de cuenta</h2>
      </div>
      {
        !loading ? (
          <form>
            <div className="text-base border border-[#ebebeb] p-6 rounded-2xl text-black">
              <h2 className="mb-6 text-lg font-semibold text-[#84633f]">Cambiar contraseña</h2>
              <div className="flex flex-col gap-5">
                <div>
                  <span className="text-[#c7c7c7]">Contraseña actual</span>
                  <input
                    type="password"
                    className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                  focus:outline-[#ffc1ad] focus:border-[#f14913]"
                    placeholder="Ingresa tu contraseña actual"
                  />
                </div>
                <div className="flex gap-5">
                  <div>
                    <span className="text-[#c7c7c7]">Nueva contraseña</span>
                    <input
                      type="password"
                      className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                    focus:outline-[#ffc1ad] focus:border-[#f14913]"
                      placeholder="Ingresa tu neva contraseña"
                    />
                  </div>
                  <div>
                    <span className="text-[#c7c7c7]">Confirma tu nueva contraseña</span>
                    <input
                      type="password"
                      className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                      focus:outline-[#ffc1ad] focus:border-[#f14913]"
                      placeholder="Confirma tu neva contraseña"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className={`btn btn-neutral mt-7 p-1 px-7 h-9`}>
                Cambiar contraseña
              </button>
            </div>
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
