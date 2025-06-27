import { useState } from "react";
import { BiUpload } from "react-icons/bi";

type EditImageModalProps = {
  showModal: boolean;
  onClose: () => void;
}

export default function EditImageModal({ showModal, onClose }: EditImageModalProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Drop ' + e.dataTransfer.files);
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Change ' + e.target.files);
  }

  // const handleFiles = (files: File[]) => {
  //   console.log(files)
  // }

  return (
    <div
      className={`${showModal ? 'visible opacity-100' : 'invisible opacity-0 '} w-screen h-full z-20 
      fixed top-0 flex justify-center items-center`}
    >
      <div className="bg-[#1c1c1c7c] w-full h-full absolute" onClick={onClose} />
      <div
        className="grid grid-rows-[auto_1fr_auto] z-20 bg-white w-[560px] text-[#212529] h-[calc(100%-110px)]
        min-h-[164px] max-h-[853px] rounded-3xl"
      >
        <div className="p-3 pl-4 text-xl font-medium border-b border-[#ebebeb]">
          <h1>Personaliza tu foto</h1>
        </div>
        <div className="flex justify-center items-center">

          <label
            onDrop={handleDrop}
            onDragEnter={() => {
              setIsDragOver(true);
            }}
            onDragLeave={() => {
              setIsDragOver(false);
            }}
            onDragOver={(e: React.DragEvent) => {
              e.preventDefault()
              setIsDragOver(true);
            }}
            className={`w-72 h-60 border-2 border-dashed hover:bg-[#f9fafb] rounded-2xl cursor-pointer transition-all
                  duration-300
                  ${isDragOver
                ? "border-blue-500 bg-blue-50 scale-105"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}
                  ${isUploading && "pointer-events-none opacity-75"}`}
          >
            <input type="file" className="hidden" onChange={handleChangeImage} />

            <div className="flex flex-col h-full items-center justify-center space-y-1">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                      duration-200 ${isDragOver ? "bg-blue-100" : "bg-gray-100"}`}
              >
                {isUploading ? (
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <BiUpload
                    className={`w-8 h-8 transition-colors duration-200 
                          ${isDragOver ? "text-blue-500" : "text-gray-500"}`}
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

        </div>
        <div className="p-4 text-xl flex justify-end font-medium border-t gap-4 border-[#ebebeb]">
          <button className="btn rounded-full" onClick={onClose}>Cancelar</button>
          <button className="btn btn-neutral rounded-full">Guardar</button>
        </div>
      </div>
    </div>
  )
}