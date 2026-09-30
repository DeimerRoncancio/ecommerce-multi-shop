type ImagePreviewProps = {
  previewImage: string;
  loading: boolean;
}

export default function ImagePreview({ previewImage, loading }: ImagePreviewProps) {
  return (
    <div className="avatar relative">
      <div className="w-52 rounded-full bg-base-100 ring-4 ring-brand ring-offset-4 ring-offset-base-100">
        <img src={previewImage} alt="Vista previa de tu nueva foto" className="h-full w-full object-cover" />
      </div>
      <div className={`${!loading ? 'opacity-0' : 'opacity-100'} absolute !flex justify-center items-center
      w-full h-full bg-[#16161656] rounded-full`}>
        <span className="loading loading-spinner w-14 text-white"></span>
      </div>
    </div>
  )
}
