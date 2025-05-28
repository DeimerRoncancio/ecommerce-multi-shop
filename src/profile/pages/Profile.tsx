import { useOutletContext } from "react-router"
import { UserTypes } from "../types/user";
import UserDataField from "../components/UserDataField";
import UserDataRadio from "../components/UserDataRadio";
import { useForm } from "react-hook-form";

type userContext = {
  user: UserTypes,
  userLoading: boolean
}

export default function Profile() {
  const { user, userLoading: loading } = useOutletContext<userContext>();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

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
                name={"name(s)"}
                fieldName={"Nombres(s)"}
                data={user.name + ' ' + user.secondName}
              />
              <UserDataField
                register={register}
                name={"lastnames"}
                fieldName={"Apellido(s)"}
                data={user.lastnames}
              />
              <UserDataField
                register={register}
                name={"email"}
                fieldName={"Email"}
                data={user.email}
              />
              <UserDataField
                register={register}
                name={"phoneNumber"}
                fieldName={"Numero de telefono"} data={user.phoneNumber?.toString()}
              />
              <UserDataRadio register={register} data={user.gender} />
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
