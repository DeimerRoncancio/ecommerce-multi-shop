import { useOutletContext } from "react-router"
import { UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../types/user";
import UserDataField from "../components/UserDataField";
import UserDataRadio from "../components/UserDataRadio";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { updateTypesToRequestTypes } from "../mappers/profile.mapper";
import { initialUserValues } from "../helpers/users-initial-values.helper";
import { updateDataUser } from "../services/users.api";

type userContext = {
  user: UserTypes,
  userLoading: boolean,
  updateUser: (user: UpdateRequestTypes) => void
}

export default function Profile() {
  const { user, userLoading: loading, updateUser } = useOutletContext<userContext>();
  const { register, handleSubmit, reset, control } = useForm<UserUpdateTypes>();
  const [isActive, setIsActive] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const userInitialValues = initialUserValues(user);
  const currentValues = useWatch({ control });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSubmit: SubmitHandler<UserUpdateTypes> = (data) => {
    const userInfo: UpdateRequestTypes = updateTypesToRequestTypes(data);

    updateDataUser(user.id, userInfo);
    updateUser(userInfo);

    setIsActive(false);
    setIsUpdated(true);

    handleUpdatedAlert();
  }

  const handleUpdatedAlert = () => {
    if (isUpdated && timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsUpdated(false), 4000);
  }

  const handleActive = () => {
    const keys = Object.keys(userInitialValues) as (keyof UserUpdateTypes)[];
    const isChanged = keys.some(key => currentValues[key] !== userInitialValues[key]);

    setIsActive(isChanged);
  }

  useEffect(() => {
    if (user) reset(userInitialValues);
  }, [user, reset]);

  useEffect(() => handleActive(), [currentValues]);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-[#5e472d]">Información de tu cuenta</h2>
      </div>
      {
        !loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-base text-black grid grid-cols-2 gap-5">
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
            <button className={`btn btn-neutral mt-7 mr-3 p-1 px-7 h-9`} disabled={!isActive ? true : false}>
              Actualizar datos
            </button>
            <button className="btn mt-7 p-1 px-6 h-9" disabled={!isActive ? true : false}>Reestablecer datos</button>
          </form>
        ) : (
          <div className="w-full mt-28 flex justify-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )
      }

      <div role="alert" className={`alert alert-success fixed bottom-5 right-5 transition-all duration-300
      ${isUpdated ? 'opacity-100 visible -translate-x-0' : 'opacity-0 invisible translate-x-full'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Tus datos han sido actualizados!</span>
        <button className="btn btn-sm bg-[#186c56] border-none text-[#053b2d] shadow-none rounded-full p-0 m-0 h-fit
        ml-10" onClick={() => setIsUpdated(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </>
  );
}
