import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsFromRegister } from "../constants/register.helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterFormData } from "../zod/routesAuth";
import { addUserType, userType } from "../types/auth";
import ErrorMessage from "../components/MessageError";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profileImage, ...rest } = data;

    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value.length > 0) {
        console.log(key, value);
        formData.append(key, value);
      }
    });

    if (file.current) {
      formData.append("profileImage", file.current);
    } else {
      const file = new File([""], "emptyFile", { type: "text/plain" });
      formData.append("profileImage", file);
    }

    axios.post("https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/users/register", formData,)
      .then(() => {
        toast.success("Registro con exito", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }).catch((error) => {
        toast.error("Error al registrarse", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
      });

    addUserType.map((key) => {
      setValue(key, "");
    });

    setPreviewImage(null);
    file.current = null;
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
        <ToastContainer />
        <form className="w-full md:w-[80%] h-[80%] flex flex-col gap-4 items-center" 
          onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-extrabold text-xl text-green-500">
            Ecommerce Multi Shop
          </h2>
          <div className="w-full flex flex-col gap-4 items-center">
            {InputsFromRegister.map((input, index) => {
              return (
                <div key={index} className="w-[90%] flex flex-col gap-2 md:w-[40%]">
                  <label htmlFor="">
                    {input.label}{" "}
                    {input.label === "Primer Nombre" ||
                    input.label === "Correo" ||
                    input.label === "Contraseña" ? (
                      <span className="text-red-500">*</span>
                    ) : null}
                  </label>
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
            <div className="w-[90%] md:w-[40%]">
              <label htmlFor="">Genero</label>
              <select className="select select-primary w-full" defaultValue=""{...register("gender")}>
                <option value="notToSaid">Seleccionar Genero</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
              <span style={{ color: "red" }}>{errors.gender?.message}</span>
            </div>
            <label className="w-[90%] btn btn-primary md:w-[40%]">
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
                <img className="w-[100px] h-[100px] object-cover rounded-3xl" src={previewImage} alt="" />
              </>
            )}
          </div>
          <button className="w-[90%] btn btn-primary md:w-[40%]">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
