import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdMail, IoMdClose } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

type GuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GuestModal({ isOpen, onClose }: GuestModalProps) {
  const navigate = useNavigate();
  // Igual que el carrito: se monta en <body> para no quedar atrapado dentro de
  // la navbar, que crea un marco de referencia por su backdrop-blur.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    sessionStorage.setItem('guestEmail', email);
    onClose();
    navigate('/profile/wish-list');    
  }

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-line p-7 text-ink transition-all transform scale-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ink-muted hover:text-ink p-1.5 rounded-full hover:bg-brand-soft transition-colors"
        >
          <IoMdClose size={20} />
        </button>
        <div className="flex items-center gap-3.5 mb-5">
          <div className="p-3 bg-brand-soft text-brand border border-line rounded-2xl">
            <IoPersonAddOutline size={22} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">Ingresar como invitado</h3>
            <p className="text-xs text-ink-soft mt-0.5">Navega o realiza compras sin crear cuenta</p>
          </div>
        </div>
        <form action="" onSubmit={onSubmit}>
          <div className="space-y-4">
            <p className="text-sm text-ink-soft leading-relaxed">
              Ingresa tu correo electrónico para vincular tus pedidos temporales y recibir las confirmaciones de compra.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-ink">
                Correo electrónico
              </label>
              <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 shadow-xs focus-within:border-brand focus-within:ring-2 focus-within:ring-brand-soft transition-all">
                <IoMdMail className="text-brand text-lg shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="nombre@correo.com"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-7 pt-4 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-ink-soft hover:text-ink hover:bg-brand-soft rounded-2xl border border-line transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-brand hover:bg-brand-dark shadow-[0_8px_20px_-8px_#f04913] rounded-2xl transition-all"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
