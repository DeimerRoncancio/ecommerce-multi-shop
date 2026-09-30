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
    className={`group block h-60 w-full cursor-pointer rounded-xl border-2 border-dashed transition-all
    duration-200 ${isUploading && "pointer-events-none opacity-75"}
    ${isDragOver
      ? "scale-[1.02] border-brand bg-brand-soft"
      : "border-brand/30 bg-brand-soft/40 hover:border-brand hover:bg-brand-soft"}`}
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
        duration-200 ${isDragOver ? "bg-brand text-white" : "bg-base-100 text-brand group-hover:bg-brand group-hover:text-white"}`}>
          {isUploading ? (
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          ) : (
            <BiUpload
              className="w-7 h-7"
            />
          )}
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold text-ink">
            {isUploading ? "Subiendo imagen..." : "Arrastra tu foto aquí"}
          </h3>
          <p className="text-sm text-ink-soft">o <b className="text-brand">haz clic para elegirla</b></p>
          <p className="text-xs text-ink-muted">PNG, JPG, GIF, WEBP</p>
        </div>
      </div>
    </label>
  )
}
