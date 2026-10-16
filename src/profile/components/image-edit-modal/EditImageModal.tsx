import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useFetcher, useRouteLoaderData } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { UserTypes } from "../../types/user";
import { SnackbarUtilities } from "../../../shared/utilities/snackbar-manager";
import useScrollLock from "../../../shared/hooks/useScrollLock";
import ImageDragBox from "./ImageDragBox";
import ImagePreview from "./ImagePreview";
import type { action } from "../../actions/profile-image.action";
import type { action as avatarAction } from "../../actions/avatar.action";
import type { loader as appLoader } from "../../../App";
import { avatarNumbers, avatarPath } from "../../../shared/utilities/avatar";

type EditImageModalProps = {
  user: UserTypes;
  showModal: boolean;
  onClose: () => void;
};

export default function EditImageModal({ user, showModal, onClose }: EditImageModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const chosenAvatar = useRouteLoaderData<typeof appLoader>("App")?.chosenAvatar ?? null;
  const fetcher = useFetcher<typeof action>();
  const avatarFetcher = useFetcher<typeof avatarAction>();
  const loading = fetcher.state !== "idle" || avatarFetcher.state !== "idle";
  const canUpload = user.id.length > 0;
  const hasPhoto = Boolean(user.profileImage?.imageUrl);
  const currentAvatar = hasPhoto ? null : chosenAvatar;
  const titleId = useId();
  const { register, handleSubmit } = useForm();
  const ref = useRef<File | null>();
  useScrollLock(showModal);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (!fetcher.data.ok) return SnackbarUtilities.error("No pudimos cambiar tu foto. Inténtalo de nuevo.");

    setPreviewImage(null);
    onClose();
    SnackbarUtilities.success("Imagen cambiada con exito");
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    if (avatarFetcher.state !== "idle" || !avatarFetcher.data) return;
    if (!avatarFetcher.data.ok) return SnackbarUtilities.error("No pudimos cambiar tu avatar. Inténtalo de nuevo.");

    setSelectedAvatar(null);
    onClose();
    SnackbarUtilities.success("Avatar cambiado");
  }, [avatarFetcher.state, avatarFetcher.data]);

  const submit = () => {
    if (selectedAvatar !== null) {
      avatarFetcher.submit({ avatar: selectedAvatar }, { method: "post", action: "/avatar-action" });
      return;
    }
    if (!ref.current) return;
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("file", ref.current);

    fetcher.submit(formData, {
      method: "post",
      action: "/profile-image-action",
      encType: "multipart/form-data",
    });
  };

  const setImage = (file: File, fileUrl: string) => {
    ref.current = file;
    setPreviewImage(fileUrl);
    setSelectedAvatar(null);
  };

  const clearImage = () => {
    ref.current = null;
    setPreviewImage(null);
  };

  const closeModal = () => {
    if (loading) return;
    onClose();
    clearImage();
    setSelectedAvatar(null);
  };

  const chooseAvatar = (avatar: number) => {
    clearImage();
    setSelectedAvatar(avatar === currentAvatar ? null : avatar);
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-150 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={closeModal} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-base-100 text-ink shadow-card-hover
          transition-transform duration-150 ${showModal ? "scale-100" : "scale-95"}`}
      >
        <form onSubmit={handleSubmit(submit)}>
          <header className="flex items-start justify-between gap-3 border-t-4 border-brand px-5 pb-2 pt-5">
            <div>
              <h2 id={titleId} className="text-xl font-extrabold">
                {canUpload ? "Cambia tu foto" : "Elige tu avatar"}
              </h2>
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

          <div className="px-5 pt-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">Elige un avatar</p>
            {hasPhoto && <p className="mt-1 text-xs text-ink-soft">Si eliges un avatar, se quitará tu foto actual.</p>}
            <ul className="mt-3 flex justify-between gap-2">
              {avatarNumbers.map(avatar => {
                const active = (selectedAvatar ?? currentAvatar) === avatar;

                return (
                  <li key={avatar}>
                    <button
                      type="button"
                      aria-label={`Avatar ${avatar}`}
                      aria-pressed={active}
                      disabled={loading}
                      onClick={() => chooseAvatar(avatar)}
                      className={`block h-14 w-14 overflow-hidden rounded-full transition-all sm:h-16 sm:w-16 ${
                        active ? "ring-3 ring-brand ring-offset-2" : "opacity-80 hover:scale-105 hover:opacity-100"
                      }`}
                    >
                      <img src={avatarPath(avatar)} alt="" className="h-full w-full" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {canUpload ? (
            <div className="flex min-h-64 flex-col justify-center px-5 py-5">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                {hasPhoto ? "Sube una foto nueva" : "O sube tu foto"}
              </p>
              {previewImage === null ? (
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
          ) : (
            <p className="px-5 py-5 text-sm text-ink-soft">Crea una cuenta para subir tu propia foto.</p>
          )}

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
              disabled={(!previewImage && selectedAvatar === null) || loading}
              className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink
                disabled:bg-base-300 disabled:text-ink-muted"
            >
              {loading ? "Guardando…" : selectedAvatar !== null ? "Guardar avatar" : "Guardar foto"}
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}
