import { useOutletContext } from "react-router"
import { UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../types/user";
import UserDataField from "../components/UserDataField";
import UserDataRadio from "../components/UserDataRadio";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUserService } from "../hooks/api/useUserService";
import UserUpdateAlert from "../components/UserUpdateAlert";
import { useUpdateAlert } from "../hooks/useUpdateAlert";
import type { Route } from "./+types/profile";
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
    handleSubmit, reset
  } = useUserService({ user, token, updateUser });

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
      <h2 className="text-3xl font-extrabold text-ink">Datos personales</h2>
      <p className="mt-0.5 text-sm text-ink-muted">Con estos datos confirmamos tus pedidos y te avisamos del envío.</p>
      {
        !loading ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div>
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Información personal</h3>
              <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
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
                  fieldName="Correo electrónico"
                  type="email"
                />
                <UserDataField
                  register={register}
                  name="phoneNumber"
                  fieldName="Número de teléfono"
                  type="tel"
                />
                <UserDataRadio register={register} />
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-end gap-2.5 border-t border-line pt-5">
              {isActive && <p className="mr-auto text-xs font-semibold text-ink-muted">Tienes cambios sin guardar</p>}
              <button
                type="button"
                onClick={() => reset(userInitialValues)}
                disabled={!isActive}
                className="h-10 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors
                  hover:border-ink disabled:border-line disabled:text-ink-muted"
              >
                Deshacer cambios
              </button>
              <button
                type="submit"
                disabled={!isActive}
                className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink
                  disabled:bg-base-300 disabled:text-ink-muted"
              >
                Guardar cambios
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
