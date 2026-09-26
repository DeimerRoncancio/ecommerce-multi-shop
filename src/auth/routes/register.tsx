import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsFromRegister } from "../constants/register.helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterFormData } from "../zod/routesAuth";
import { addUserType, userType } from "../types/auth";
import ErrorMessage from "../components/MessageError";
import { FiImage, FiUserPlus } from "react-icons/fi";
import axios from "axios";
// react-toastify inserta un nodo en el <head> al importarse. Si eso pasa antes
// de hidratar, React descarta el HTML del servidor (incluido el CSS) y la página
// queda sin estilos. Por eso se carga solo en el cliente, ya montada.
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

const requiredFields = ["name", "email", "password"];
const wideFields = ["email", "password"];

export const Register = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // react-toastify no renderiza igual en el servidor que en el cliente y rompía
  // la hidratación (el documento entero se reemplazaba y se perdía el CSS).
  const [isMounted, setIsMounted] = useState(false);
  const file = useRef<File | null>(null);

  useEffect(() => setIsMounted(true), []);
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
    <div className="min-h-screen w-full bg-brand-soft">
      {isMounted && (
        <Suspense fallback={null}>
          <ToastContainer />
        </Suspense>
      )}
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-brand px-8 py-10
          text-white lg:px-12">
          <div className="absolute -left-12 top-12 h-56 w-56 rounded-full border border-white/20" />
          <div className="absolute right-6 top-24 h-40 w-40 rounded-full border border-white/15" />
          <div className="absolute bottom-16 left-20 h-64 w-64 rounded-full border border-white/10" />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-lg font-semibold">
              MS
            </span>
            <span className="text-lg font-semibold">MultiShop</span>
          </Link>

          <div className="relative z-10 max-w-md space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
              Crea tu cuenta
            </h1>
            <p className="text-base text-white/90">
              Guarda tus direcciones, sigue tus pedidos y arma tu lista de deseos.
            </p>
          </div>

          <ul className="relative z-10 flex flex-col gap-2 text-sm text-white/90">
            <li>· Checkout más rápido en cada compra</li>
            <li>· Historial de pedidos siempre a mano</li>
            <li>· Ofertas exclusivas para tu cuenta</li>
          </ul>
        </section>

        <section className="flex items-center justify-center bg-base-100 px-6 py-10 lg:px-12">
          <div className="w-full max-w-xl">
            <div className="mb-8">
              <h2 className="font-display text-3xl font-semibold text-ink">Registrarse</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Completa tus datos para crear la cuenta
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-5 sm:grid-cols-2">
                {InputsFromRegister.map((input) => (
                  <div
                    key={input.name}
                    className={`flex flex-col gap-2 ${
                      wideFields.includes(input.name) ? "sm:col-span-2" : ""
                    }`}
                  >
                    <label htmlFor={input.name} className="text-sm font-medium text-ink">
                      {input.label}
                      {requiredFields.includes(input.name) && (
                        <span className="ml-1 text-brand">*</span>
                      )}
                    </label>
                    <input
                      id={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      className="w-full rounded-xl border border-line bg-base-100 px-4 py-3 text-sm
                        text-ink outline-none transition-colors placeholder:text-ink-muted
                        focus:border-brand"
                      {...register(input.name)}
                    />
                    <ErrorMessage errors={errors} fieldName={input.name} />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="gender" className="text-sm font-medium text-ink">
                    Género
                  </label>
                  <select
                    id="gender"
                    defaultValue=""
                    className="w-full rounded-xl border border-line bg-base-100 px-4 py-3 text-sm
                      text-ink outline-none transition-colors focus:border-brand"
                    {...register("gender")}
                  >
                    <option value="notToSaid">Seleccionar género</option>
                    <option value="male">Hombre</option>
                    <option value="female">Mujer</option>
                  </select>
                  {errors.gender?.message && (
                    <span className="text-xs text-error">{errors.gender.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-ink">Foto de perfil</span>
                  <div className="flex items-center gap-3">
                    <label
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-line
                        bg-cream px-4 py-3 text-sm text-ink transition-colors hover:border-brand
                        hover:text-brand"
                    >
                      <FiImage size={17} />
                      Subir imagen
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        {...register("profileImage")}
                        onChange={handleChange}
                      />
                    </label>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Vista previa"
                        className="h-12 w-12 rounded-full border border-line object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn h-12 gap-2 rounded-xl border-0 bg-brand text-primary-content
                  shadow-none hover:bg-brand-dark"
              >
                <FiUserPlus size={18} />
                Crear cuenta
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-soft">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="ml-1 font-semibold text-brand hover:text-brand-dark">
                Inicia sesión
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
