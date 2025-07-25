import { useState } from "react";
import DeleteAccountConfirmationModal from "./DeleteAccountConfirmationModal";
import { useUserService } from "../../hooks/api/useUserService";
import { UserTypes } from "../../types/user";

type Props = {
  token: string;
  user: UserTypes;
}

export default function DeleteForm({ token, user }: Props) {
  const { deleteAccount } = useUserService({ user, token });
  const [showDeleteModal, setDeleteModal] = useState(false);
  
  const deleteUser = () => deleteAccount(user.id, token);

  const onSubmit = () => {
    document.body.classList.add('overflow-hidden');
    setDeleteModal(true);
  }

  const onCloseModal = () => {
    document.body.classList.remove('overflow-hidden');
    setDeleteModal(false)
  };

  return (
    <div>
      <div className="mt-7 text-base border border-red-100 p-6 rounded-2xl text-black">
        <h2 className="mb-3 text-lg font-semibold text-red-400">Eliminar Cuenta</h2>
        <p className="text-[#4d5154] mb-3">
          Una vez eliminada tu cuenta, no podras deshacer los cambios. Por favor, asegurate.
        </p>
        <button className={`btn btn-error p-1 px-7 h-9`} onClick={onSubmit}>
          Eliminar cuenta
        </button>
        <DeleteAccountConfirmationModal
          showDeleteModal={showDeleteModal}
          onClose={onCloseModal}
          deleteAccount={deleteUser}
        />
      </div>
    </div>
  );
}
