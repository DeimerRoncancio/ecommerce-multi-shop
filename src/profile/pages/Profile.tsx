import { useOutletContext } from "react-router"
import { UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../types/user";
import UserDataField from "../components/UserDataField";
import UserDataRadio from "../components/UserDataRadio";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { envs } from "../../shared/config/env.config";
import { updateTypesToRequestTypes } from "../mappers/profile-mapper";

type userContext = {
  user: UserTypes,
  userLoading: boolean,
  updateUser: (user: UserUpdateTypes) => void
}

export default function Profile() {
  const { user, userLoading: loading, updateUser } = useOutletContext<userContext>();

  const { register, handleSubmit, reset } = useForm<UserUpdateTypes>();

  const onSubmit: SubmitHandler<UserUpdateTypes> = (data) => {
    const userInfo: UpdateRequestTypes = updateTypesToRequestTypes(data);

    const token = Cookies.get("accessHome");

    axios.put(`${envs.API}/app/users/update/${user.id}`, userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    updateUser(userInfo);
  }

  useEffect(() => {
    if (user) {
      reset({
        names: user.name + (user.secondName ? ' ' + user.secondName : ''),
        lastnames: user.lastnames,
        email: user.email,
        phoneNumber: user.phoneNumber?.toString(),
        gender: user.gender,
      })
    }
  }, [user, reset])

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
                fieldName={"Nombres(s)"}
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
