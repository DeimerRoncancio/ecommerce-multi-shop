import { BsCheck2Circle } from "react-icons/bs";
import { TiWarningOutline } from "react-icons/ti";

type PasswordChangeConfirmationModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  showModal: boolean;
  loading: boolean;
  isSucces: boolean;
}

export default function PasswordChangeConfirmationModal({ 
  onClose,
  onSubmit,
  loading,
  showModal,
  isSucces,
}: PasswordChangeConfirmationModalProps) {
  return (
    <div className={`${showModal ? 'visible opacity-100' : 'invisible opacity-0'} fixed w-full 
    h-full z-20 top-0 left-0 flex justify-center items-center transition-all duration-75`}>
      <div className="absolute w-full h-full top-0 bg-[#1c1c1c7c]"
        onClick={onClose}
      />
      <div className={`${showModal && 'scale-110'} z-20 bg-white w-[450px] text-[#212529] min-h-[164px]
      rounded-lg transition-all duration-150 p-6`}>
        <div className="flex items-center gap-2">
          <TiWarningOutline size={25} color="#f6aa2a" />
          <p className="text-lg font-semibold">Confirmar Cambio de Contraseña</p>
        </div>
        <div>
          <p className="text-base text-[#71717a]">
            ¿Estás seguro de que deseas cambiar tu contraseña? Esta acción no se puede deshacer.
          </p>
        </div>
        {
          isSucces ? (
            <span className="flex p-3 mt-4 items-center gap-2 bg-green-50 border border-green-200 rounded-md">
              <BsCheck2Circle />
              <p className="text-sm text-green-800">Contraseña cambiada exitosamente</p>
            </span>
          ) : (
            <div className="flex justify-end items-center gap-4 mt-4">
              <div className="btn rounded-sm" onClick={onClose}>Cancelar</div>
              <div className={`btn rounded-sm btn-error ${loading && 'btn-disabled'}`}
                onClick={onSubmit}>{
                  loading ? 'Confirmando...' : 'Confirmar'}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
