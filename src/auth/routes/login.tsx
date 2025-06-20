import { SubmitHandler, useForm } from "react-hook-form";
import { LoginAccessUser, LoginAccesUserFormData } from "../zod/routesAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAccessUserType } from "../constants/login.helper";
import useLogin from "../hooks/api/useLogin";

export default function Login() {
  const { sendData } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAccesUserFormData>({ resolver: zodResolver(LoginAccessUser) });

  const onSubmit: SubmitHandler<LoginAccessUserType> = (data: LoginAccesUserFormData) => {
    sendData(data);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl">Login</h1>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="identifier" className="input input-bordered flex items-center gap-2 w-[307px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Correo electronico o numero de telefono"
            {...register("identifier")}
          />
        </label>
        <span style={{ color: "red" }}>{errors["identifier"]?.message}</span>
        <label htmlFor="password" className="input input-bordered flex items-center gap-2 w-[307px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Contraseña"
            {...register("password")}
          />
        </label>
        <span style={{ color: "red" }}>{errors["password"]?.message}</span>
        <button className="btn btn-active btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );
}
