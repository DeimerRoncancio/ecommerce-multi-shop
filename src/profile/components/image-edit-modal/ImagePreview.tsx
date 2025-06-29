type ImagePreviewProps = {
  previewImage: string;
  loading: boolean;
}

export default function ImagePreview({ previewImage, loading }: ImagePreviewProps) {
  return (
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
