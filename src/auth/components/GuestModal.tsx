import { IoMdMail, IoMdClose } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

type GuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GuestModal({ isOpen, onClose }: GuestModalProps) {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    sessionStorage.setItem('guestEmail', email);
    onClose();
    navigate('/profile/wish-list');    
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#f1e1dc] p-7 text-[#3a2f2a] transition-all transform scale-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#b3a7a2] hover:text-[#3a2f2a] p-1.5 rounded-full hover:bg-[#fff4ef] transition-colors"
        >
          <IoMdClose size={20} />
        </button>
        <div className="flex items-center gap-3.5 mb-5">
          <div className="p-3 bg-[#fff4ef] text-[#f14913] border border-[#f1e1dc] rounded-2xl">
            <IoPersonAddOutline size={22} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#3a2f2a]">Ingresar como invitado</h3>
            <p className="text-xs text-[#7a6f6a] mt-0.5">Navega o realiza compras sin crear cuenta</p>
          </div>
        </div>
        <form action="" onSubmit={onSubmit}>
          <div className="space-y-4">
            <p className="text-sm text-[#7a6f6a] leading-relaxed">
              Ingresa tu correo electrónico para vincular tus pedidos temporales y recibir las confirmaciones de compra.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#5e472d]">
                Correo electrónico
              </label>
              <div className="flex items-center gap-2.5 rounded-2xl border border-[#f1e1dc] bg-white px-4 py-3 shadow-xs focus-within:border-[#f14913] focus-within:ring-2 focus-within:ring-[#ffc1ad] transition-all">
                <IoMdMail className="text-[#f14913] text-lg shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="nombre@correo.com"
                  className="w-full bg-transparent text-sm text-[#3a2f2a] outline-none placeholder:text-[#b3a7a2]"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-7 pt-4 border-t border-[#f1e1dc]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-[#7a6f6a] hover:text-[#3a2f2a] hover:bg-[#fff4ef] rounded-2xl border border-[#f1e1dc] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#f04913] hover:bg-[#d94110] shadow-[0_8px_20px_-8px_#f04913] rounded-2xl transition-all"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
