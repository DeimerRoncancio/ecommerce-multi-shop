import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsFromRegister } from "../helpers/register.helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterFormData } from "../../zod/routesAuth";
import { addUserType, userType } from "../types/auth";
import ErrorMessage from "../../components/Errormessage";
import axios from "axios";

export const Register = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const file = useRef<File | null>(null);
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterForm) });

  const onSubmit: SubmitHandler<userType> = (data) => {
    console.log(data);
    console.log(file.current);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profileImage, ...rest } = data;

    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file.current) {
      formData.append("file", file.current);
    }

    axios
      .post(
        "https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Tipo de contenido
          },
        },
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    addUserType.map((key) => {
      setValue(key, "");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arrFiles = Array.from(e.target.files);
      file.current = arrFiles[0];

      const urlImg = URL.createObjectURL(arrFiles[0]);
      setPreviewImage(urlImg);
    }
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
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
              <span style={{ color: "red" }}>{errors.gender?.message}</span>
            </div>
            <label className="btn btn-primary w-[40%]">
              Agregar Imagenes
              <input
                hidden
                type="file"
                {...register("profileImage")}
                onChange={handleChange}
              />
            </label>
            {previewImage && (
              <>
                <img
                  className="w-[100px] h-[100px] object-cover rounded-3xl"
                  src={previewImage}
                  alt=""
                />
              </>
            )}
          </div>
          <button className="btn btn-primary w-[40%]">Guardar</button>
        </form>
      </div>
    </>
  );
};
