import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterFormData } from "../zod/routesAuth";
import { envs } from "../../shared/config/env.config";
import { addUserType, userType } from "../types/auth";
import {
  FiCamera, FiEye, FiEyeOff, FiUserPlus,
} from "react-icons/fi";
import TextField from "../../shared/ui/TextField";
import AuthLayout from "../components/AuthLayout";
import axios from "axios";
import {
  InputsFromRegister, genderOptions, registerIcons, registerPerks, requiredFields, wideFields,
} from "../constants/register.helpers";

const ToastContainer = lazy(() =>
  import("react-toastify").then(module => ({ default: module.ToastContainer })),
);

const notify = async (type: "success" | "error", message: string) => {
  const { toast } = await import("react-toastify");
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const Register = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const file = useRef<File | null>(null);

  useEffect(() => setIsMounted(true), []);
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterForm) });

  const onSubmit: SubmitHandler<userType> = (data) => {
    const { profileImage, ...rest } = data;

    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value.length > 0) {
        formData.append(key, value);
      }
    });

    if (file.current) {
      formData.append("profileImage", file.current);
    } else {
      const file = new File([""], "emptyFile", { type: "text/plain" });
      formData.append("profileImage", file);
    }

    axios.post(`${envs.API}/app/users/register`, formData)
      .then(() => notify("success", "Registro con éxito"))
      .catch((error) => {
        notify("error", "Error al registrarse");
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
    <AuthLayout
      title="Crea tu cuenta,"
      highlight="es gratis"
      subtitle="Sigue tus pedidos, arma tu lista de deseos y paga más rápido."
      perks={registerPerks}
    >
      {isMounted && (
        <Suspense fallback={null}>
          <ToastContainer />
        </Suspense>
      )}

      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-ink">Registrarse</h2>
        <p className="mt-1 text-sm text-ink-muted">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-bold text-brand underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>

        <form className="mt-6 flex flex-col gap-3.5" onSubmit={handleSubmit(onSubmit)}>
          <label className="group flex w-fit cursor-pointer items-center gap-3.5">
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2
              border-dashed border-brand/40 bg-brand-soft/60 text-brand transition-colors group-hover:border-brand">
              {previewImage ? (
                <img src={previewImage} alt="Vista previa de tu foto" className="h-full w-full object-cover" />
              ) : (
                <FiCamera size={22} />
              )}
            </span>
            <span className="leading-tight">
              <b className="block text-sm text-ink group-hover:text-brand">
                {previewImage ? "Cambiar foto" : "Agregar foto de perfil"}
              </b>
              <span className="text-xs text-ink-muted">Opcional · PNG o JPG</span>
            </span>
            <input
              hidden
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleChange}
            />
          </label>

          <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
            {InputsFromRegister.map((input) => (
              <TextField
                key={input.name}
                id={input.name}
                label={input.label}
                type={input.name === "password" && showPassword ? "text" : input.type}
                placeholder={input.placeholder}
                icon={registerIcons[input.name]}
                requiredMark={requiredFields.includes(input.name)}
                hint={input.name === "password" ? "Mínimo 8 caracteres" : undefined}
                className={wideFields.includes(input.name) ? "sm:col-span-2" : ""}
                error={errors[input.name]?.message}
                trailing={input.name === "password" ? (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition-colors
                      hover:bg-cream hover:text-brand"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                ) : undefined}
                {...register(input.name)}
              />
            ))}
          </div>

          <fieldset>
            <legend className="text-xs font-bold text-ink">Género</legend>
            <div className="mt-1 flex flex-wrap gap-2">
              {genderOptions.map(option => (
                <label
                  key={option.value}
                  className="flex h-10 cursor-pointer items-center rounded-lg border border-line px-4 text-sm text-ink
                    transition-colors hover:border-ink-muted has-checked:border-brand has-checked:bg-brand-soft/60
                    has-checked:font-bold has-checked:text-brand"
                >
                  <input
                    type="radio"
                    value={option.value}
                    defaultChecked={option.value === "notToSaid"}
                    className="sr-only"
                    {...register("gender")}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.gender?.message && (
              <p className="mt-1 text-xs font-semibold text-error">{errors.gender.message}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-brand font-bold text-white
              transition-colors hover:bg-ink"
          >
            <FiUserPlus size={18} />
            Crear cuenta
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
