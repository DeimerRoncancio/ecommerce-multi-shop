import { useOutletContext } from "react-router"
import { UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../types/user";
import UserDataField from "../components/UserDataField";
import UserDataRadio from "../components/UserDataRadio";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUpdateUser } from "../hooks/api/useUserService";
import UserUpdateAlert from "../components/UserUpdateAlert";
import { useUpdateAlert } from "../hooks/useUpdateAlert";
import { Route } from "./+types/profile";
import { getSession } from "../../sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  return { token }
}

type userContext = {
  user: UserTypes,
  userLoading: boolean,
  updateUser: (user: UpdateRequestTypes) => void
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { user, userLoading: loading, updateUser } = useOutletContext<userContext>();
  const { showAlert, handleAlert, handleUpdatedAlert } = useUpdateAlert();
  const [isActive, setIsActive] = useState(false);
  const { token } = loaderData;

  const {
    userInitialValues,
    currentValues,
    sendData, register,
    handleSubmit
  } = useUpdateUser({ user, token, updateUser });

  const onSubmit: SubmitHandler<UserUpdateTypes> = (data) => {
    sendData(data);
    setIsActive(false);
    handleAlert(true);
    handleUpdatedAlert();
  }

  const handleActive = () => {
    const keys = Object.keys(userInitialValues) as (keyof UserUpdateTypes)[];
    const isChanged = keys.some(key => currentValues[key] !== userInitialValues[key]);
    setIsActive(isChanged);
  }

  useEffect(() => handleActive(), [currentValues]);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-[#5e472d]">Información de cuenta</h2>
      </div>
      {
        !loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-base border border-[#ebebeb] p-6 rounded-2xl text-black">
              <h2 className="mb-6 text-lg font-semibold text-[#84633f]">Información personal</h2>
              <div className="grid grid-cols-2 gap-5">
                <UserDataField
                  register={register}
                  name="names"
                  fieldName="Nombres(s)"
                />
                <UserDataField
                  register={register}
                  name="lastnames"
                  fieldName="Apellido(s)"
                />
                <UserDataField
                  register={register}
                  name="email"
                  fieldName="Email"
                />
                <UserDataField
                  register={register}
                  name="phoneNumber"
                  fieldName="Numero de telefono"
                />
                <UserDataRadio register={register} />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn mt-7 p-1 px-6 h-9 mr-3" disabled={!isActive ? true : false}>Reestablecer datos</button>
              <button className={`btn btn-neutral mt-7 p-1 px-7 h-9`} disabled={!isActive ? true : false}>
                Actualizar datos
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full mt-28 flex justify-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )
      }

      <UserUpdateAlert showAlert={showAlert} closeAlert={() => handleAlert(false)} />
    </>
  );
}
