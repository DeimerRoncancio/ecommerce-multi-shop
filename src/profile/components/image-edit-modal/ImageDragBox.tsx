import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { BiUpload } from "react-icons/bi";

type ImageDragBoxProps = {
  addImage: (file: File, urlFile: string) => void;
  register: UseFormRegister<FieldValues>;
}

export default function ImageDragBox({ addImage, register }: ImageDragBoxProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    setIsUploading(true);
    e.preventDefault()
    e.stopPropagation()
    const images = Array.from(e.dataTransfer.files);
    handleFiles(images);
    setIsDragOver(false);
    setIsUploading(false);
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    handleFiles(images);
  }

  const handleFiles = (files: File[]) => {
    if (files) {
      const urlImage = URL.createObjectURL(files[0]);
      addImage(files[0], urlImage)
    }
  }

  return (
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
              className={`w-8 h-8 transition-colors duration-200 ${isDragOver ? "text-[#ec5320]" : "text-gray-500"}`}
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
  )
}
