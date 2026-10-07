import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import DeleteAccountConfirmationModal from "./DeleteAccountConfirmationModal";
import { UserTypes } from "../../types/user";

type Props = {
  user: UserTypes;
}

export default function DeleteForm({ user }: Props) {
  const [showDeleteModal, setDeleteModal] = useState(false);

  const onSubmit = () => {
    document.body.classList.add('overflow-hidden');
    setDeleteModal(true);
  }

  const onCloseModal = () => {
    document.body.classList.remove('overflow-hidden');
    setDeleteModal(false)
  };

  return (
    <section className="mt-8 border-t border-line pt-7">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-error">Zona de cuidado</h3>
      <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-error/25 bg-error/5 p-5 sm:flex-row
        sm:items-center">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-error/10 text-error">
          <FiTrash2 size={19} />
        </span>
        <div className="flex-1">
          <p className="font-extrabold text-ink">Eliminar cuenta</p>
          <p className="text-sm text-ink-soft">
            Se borran tus datos y tu foto de perfil. Esta acción no se puede deshacer.
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="h-10 shrink-0 rounded-full border border-error/40 bg-base-100 px-5 text-sm font-bold text-error
            transition-colors hover:border-error hover:bg-error hover:text-white"
        >
          Eliminar cuenta
        </button>
      </div>
      <DeleteAccountConfirmationModal
        showDeleteModal={showDeleteModal}
        onClose={onCloseModal}
        userId={user.id}
      />
    </section>
  );
}
