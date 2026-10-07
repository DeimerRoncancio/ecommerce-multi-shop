import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { UserTypes } from "../../types/user";
import { SnackbarUtilities } from "../../../shared/utilities/snackbar-manager";
import ImageDragBox from "./ImageDragBox";
import ImagePreview from "./ImagePreview";
import type { action } from "../../actions/profile-image.action";

type EditImageModalProps = {
  user: UserTypes;
  showModal: boolean;
  onClose: () => void;
}

export default function EditImageModal({ user, showModal, onClose }: EditImageModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const loading = fetcher.state !== "idle";
  const { register, handleSubmit } = useForm();
  const ref = useRef<File | null>();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (!fetcher.data.ok) return SnackbarUtilities.error("No pudimos cambiar tu foto. Inténtalo de nuevo.");

    setPreviewImage(null);
    onClose();
    SnackbarUtilities.succes('Imagen cambiada con exito');
  }, [fetcher.state, fetcher.data]);

  const submit = () => {
    if (!ref.current) return;
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('file', ref.current);

    fetcher.submit(formData, {
      method: "post",
      action: "/profile-image-action",
      encType: "multipart/form-data",
    });
  }

  const setImage = (file: File, fileUrl: string) => {
    ref.current = file;
    setPreviewImage(fileUrl);
  }

  const clearImage = () => {
    ref.current = null;
    setPreviewImage(null);
  }

  const closeModal = () => {
    if (loading) return;
    onClose();
    clearImage();
  }

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-150 ${
        showModal ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={closeModal} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-foto-perfil"
        className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-base-100 text-ink shadow-card-hover
          transition-transform duration-150 ${showModal ? 'scale-100' : 'scale-95'}`}
      >
        <form onSubmit={handleSubmit(submit)}>
          <header className="flex items-start justify-between gap-3 border-t-4 border-brand px-5 pb-2 pt-5">
            <div>
              <h2 id="titulo-foto-perfil" className="text-xl font-extrabold">Cambia tu foto</h2>
              <p className="text-sm text-ink-muted">Se verá en tu cuenta y en la barra de la tienda.</p>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={closeModal}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors
                hover:bg-brand-soft hover:text-brand"
            >
              <IoCloseOutline size={24} />
            </button>
          </header>

          <div className="flex min-h-72 items-center justify-center px-5 py-5">
            {previewImage == null ? (
              <ImageDragBox addImage={setImage} register={register} />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <ImagePreview previewImage={previewImage} loading={loading} />
                {!loading && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="text-sm font-bold text-ink-soft underline-offset-4 transition-colors hover:text-brand
                      hover:underline"
                  >
                    Elegir otra foto
                  </button>
                )}
              </div>
            )}
          </div>

          <footer className="flex justify-end gap-2.5 border-t border-line px-5 py-4">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="h-10 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors
                hover:border-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!previewImage || loading}
              className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink
                disabled:bg-base-300 disabled:text-ink-muted"
            >
              {loading ? "Guardando…" : "Guardar foto"}
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}
