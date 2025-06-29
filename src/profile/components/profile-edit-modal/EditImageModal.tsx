import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../../hooks/api/useUpdateUser";
import { ImageType, UserTypes } from "../../types/user";
import { SnackbarUtilities } from "../../../shared/utilities/snackbar-manager";
import ImageDragBox from "./ImageDragBox";

type EditImageModalProps = {
  token: string;
  user: UserTypes;
  showModal: boolean;
  onClose: () => void;
  updateImageUser: (image: ImageType) => void;
}

export default function EditImageModal({ token, user, showModal, onClose, updateImageUser }: EditImageModalProps) {
  const [loading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { sendImage } = useUpdateUser({ user, token, updateImageUser });
  const { register, handleSubmit } = useForm();
  const ref = useRef<File | null>();

  const submit = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (ref.current) formData.append('file', ref.current);

    sendImage(formData).then(() => {
      setPreviewImage(null);
      setIsLoading(false);
      onClose();
      SnackbarUtilities.succes('Imagen cambiada con exito')
    });
  }

  const setImage = (file: File, fileUrl: string) => {
    ref.current = file;
    setPreviewImage(fileUrl);
  }
  
  return (
    <div className={`${showModal ? 'visible opacity-100' : 'invisible opacity-0'}  transition-all duration-100 w-screen
    h-full z-20 fixed top-0 flex justify-center items-center`}>
      <div className="bg-[#1c1c1c7c] w-full h-full absolute" onClick={() => {
        onClose();
        setPreviewImage(null);
      }} />
      <div className={`z-20 bg-white w-[560px] text-[#212529] h-[calc(100%-110px)] min-h-[164px] max-h-[853px]
      rounded-3xl  ${!showModal && 'scale-105'} transition-all duration-150`}>
        <form className="grid grid-rows-[auto_1fr_auto] h-full" onSubmit={handleSubmit(submit)}>
          <div className="p-3 pl-4 text-xl font-medium border-b border-[#ebebeb]">
            <h1>Personaliza tu foto</h1>
          </div>
          <div className="flex justify-center items-center">
            {
              previewImage == null
                ? (
                  <ImageDragBox addImage={setImage} register={register} />
                ) : (
                  <div className="avatar relative">
                    <div className="w-80 rounded-full bg-black border-4 border-[#f9761a] shadow-[0_0_25px_3px_#ffc69e]">
                      <img src={previewImage} />
                    </div>
                    <div className={`${!loading ? 'opacity-0' : 'opacity-100'} absolute !flex justify-center items-center 
                    w-full h-full bg-[#16161656] rounded-full`}>
                      <span className="loading loading-spinner w-14 text-white"></span>
                    </div>
                  </div>
                )
            }
          </div>
          <div className="p-4 text-xl flex justify-end font-medium border-t gap-4 border-[#ebebeb]">
            <div className="btn rounded-full" onClick={() => {
              onClose();
              setPreviewImage(null);
            }}>Cancelar</div>
            <button type="submit" className="btn btn-neutral rounded-full">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
