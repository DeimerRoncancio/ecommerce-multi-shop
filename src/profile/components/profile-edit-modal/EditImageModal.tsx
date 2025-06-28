import axios from "axios";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import { envs } from "../../../shared/config/env.config";

type EditImageModalProps = {
  token: string;
  userId: string;
  showModal: boolean;
  onClose: () => void;
}

export default function EditImageModal({ token, userId, showModal, onClose }: EditImageModalProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { register, handleSubmit } = useForm();
  const ref = useRef<File | null>();

  const submit = () => {
    const formData = new FormData();
    if (ref.current) formData.append('file', ref.current);

    axios.put(`${envs.API}/app/users/update/profile-image/${userId}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((res) => console.log(res));
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const images = Array.from(e.dataTransfer.files);
    handleFiles(images);
    setIsDragOver(false);
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    handleFiles(images);
  }

  const handleFiles = (files: File[]) => {
    if (files) {
      const urlImage = URL.createObjectURL(files[0]);
      ref.current = files[0];
      setPreviewImage(urlImage);
    }
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
                  <label onDrop={handleDrop} onDragEnter={() => setIsDragOver(true)} onDragLeave={() => setIsDragOver(false)}
                  className={`w-72 h-60 border-2 border-dashed hover:bg-[#f9fafb] rounded-2xl cursor-pointer transition-all
                  duration-300 ${isUploading && "pointer-events-none opacity-75"}
                  ${isDragOver
                    ? "border-[#ec5320] bg-[#fff4f0] scale-105"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
                  onDragOver={(e: React.DragEvent) => {
                    e.preventDefault()
                    setIsDragOver(true);
                  }}>
                    <input
                      type="file"
                      className="hidden"
                      {...register("image")}
                      onChange={handleChangeImage}
                    />
                    <div className="flex flex-col h-full items-center justify-center space-y-1">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                      duration-200 ${isDragOver ? "bg-[#ffe7df]" : "bg-gray-100"}`}>
                        {isUploading ? (
                          <div className="w-8 h-8 border-2 border-[#ec5320] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <BiUpload
                            className={`w-8 h-8 transition-colors duration-200 
                        ${isDragOver ? "text-[#ec5320]" : "text-gray-500"}`}
                          />
                        )}
                      </div>
                      <div className="space-y-2 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">
                          {isUploading ? "Subiendo imágenes..." : "Arrastra tus imágenes aquí"}
                        </h3>
                        <p className="text-sm text-gray-500">o haz clic para seleccionar archivos</p>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF, WEBP</p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="avatar">
                    <div className="w-80 rounded-full bg-black border-4 border-[#f9761a] shadow-[0_0_25px_3px_#ffc69e]">
                      <img src={previewImage} />
                    </div>
                  </div>
                )
            }
          </div>
          <div className="p-4 text-xl flex justify-end font-medium border-t gap-4 border-[#ebebeb]">
            <button className="btn rounded-full" onClick={() => {
              onClose();
              setPreviewImage(null);
            }}>Cancelar</button>
            <button type="submit" className="btn btn-neutral rounded-full">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
