import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsFromRegister } from "../helpers/register.helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterFormData } from "../../zod/routesAuth";
import { userType } from "../types/auth";
import ErrorMessage from "../../components/Errormessage";

export const Register = () => {
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterForm) });

  const onSubmit: SubmitHandler<userType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center my-7">
        <form
          className="w-[80%] h-[80%] flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-extrabold text-xl text-green-500">
            Ecommerce Multi Shop
          </h2>
          <div className="w-full flex flex-col gap-4 items-center">
            {InputsFromRegister.map((input, index) => {
              return (
                <div key={index} className="flex flex-col gap-2 w-[40%]">
                  <label htmlFor="">{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="input input-bordered input-primary w-full"
                    {...register(input.name)}
                  />
                  <ErrorMessage
                    errors={errors}
                    key={register.name}
                    fieldName={input.name}
                  />
                </div>
              );
            })}
            <div className="w-[40%]">
              <label htmlFor="">Genero</label>
              <select
                className="select select-primary w-full"
                defaultValue=""
                {...register("gender")}
              >
                <option value="" disabled>
                  Seleccionar Genero
                </option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
              <span style={{ color: "red" }}>{errors.gender?.message}</span>
            </div>
            <label className="btn btn-primary w-[40%]">
              Agregar Imagenes
              <input
                hidden
                type="file"
                // {...register("profile")}
                // onChange={handleChange}
              />
            </label>
          </div>
          <button className="btn btn-primary w-[40%]">Guardar</button>
        </form>
      </div>
    </>
  );
};