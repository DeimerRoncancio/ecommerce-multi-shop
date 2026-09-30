import { FiAlertTriangle, FiImage, FiLogIn, FiUser } from "react-icons/fi";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import Modal from "../../../shared/ui/Modal";

type Props = {
  showDeleteModal: boolean;
  onClose: () => void;
  deleteAccount: () => void;
}

const removed = [
  { icon: FiUser, text: "Tus datos personales" },
  { icon: FiImage, text: "Tu foto de perfil" },
  { icon: FiLogIn, text: "Tu acceso con este correo" },
];

export default function DeleteAccountConfirmationModal({ showDeleteModal, onClose, deleteAccount }: Props) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.reload) deleteAccount();
  }, [fetcher.data]);

  return (
    <Modal
      open={showDeleteModal}
      onClose={onClose}
      tone="error"
      icon={<FiAlertTriangle size={20} />}
      title="¿Eliminar tu cuenta?"
      description="Esta acción no se puede deshacer. Tu cuenta se borra para siempre."
      footer={
        <fetcher.Form method="post" action="/logout-action" className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors
              hover:border-ink"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={fetcher.state !== "idle"}
            className="h-10 rounded-full bg-error px-5 text-sm font-bold text-white transition-colors hover:bg-ink
              disabled:bg-base-300 disabled:text-ink-muted"
          >
            {fetcher.state !== "idle" ? "Eliminando…" : "Eliminar definitivamente"}
          </button>
        </fetcher.Form>
      }
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">Se eliminará</p>
      <ul className="flex flex-col gap-2 rounded-xl bg-error/5 p-3">
        {removed.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-base-100 text-error">
              <Icon size={14} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
