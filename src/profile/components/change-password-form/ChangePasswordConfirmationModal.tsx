import { FiCheckCircle, FiLock } from "react-icons/fi";
import Modal from "../../../shared/ui/Modal";

type PasswordChangeConfirmationModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  showModal: boolean;
  loading: boolean;
  isSucces: boolean;
}

export default function ChangePasswordConfirmationModal({
  loading,
  showModal,
  isSucces,
  onClose,
  onSubmit,
}: PasswordChangeConfirmationModalProps) {
  return (
    <Modal
      open={showModal}
      onClose={onClose}
      icon={<FiLock size={20} />}
      title="¿Cambiar tu contraseña?"
      description="La próxima vez que entres tendrás que usar la contraseña nueva."
      footer={
        isSucces ? (
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full bg-ink px-6 text-sm font-bold text-white transition-colors hover:bg-brand"
          >
            Listo
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-10 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors
                hover:border-ink"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink
                disabled:bg-base-300 disabled:text-ink-muted"
            >
              {loading ? "Cambiando…" : "Sí, cambiarla"}
            </button>
          </>
        )
      }
    >
      {isSucces && (
        <p className="flex items-center gap-2.5 rounded-xl bg-success/10 px-4 py-3 text-sm font-semibold text-success">
          <FiCheckCircle size={17} />
          Tu contraseña se cambió correctamente.
        </p>
      )}
    </Modal>
  );
}
