import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductImageType } from "../../types/product";

import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/thumbs";

type Props = {
  images: ProductImageType[],
  setThumbsSwiper: (swiper: any) => void
}

export default function CarouselNavigation({ images, setThumbsSwiper }: Props) {
  return (
    <Swiper
      modules={[Thumbs, Navigation]}
      onSwiper={setThumbsSwiper}
      navigation={{
        nextEl: ".custom-next-mini",
        prevEl: ".custom-prev-mini",
      }}
      spaceBetween={10}
      slidesPerView={5}
      className="mt-4"
    >
      {images.map((image) => (
        <SwiperSlide key={image.imageId} className="!h-auto !w-20 !flex items-center !justify-center
          cursor-pointer border-2 border-gray-300 rounded-lg m-1 transition-all duration-300
          [&.swiper-slide-thumb-active]:border-blue-500
          [&.swiper-slide-thumb-active]:outline-2 outline-blue-300">
          <img
            src={image.imageUrl}
            alt={`Thumbnail ${image.imageId}`}
            className="rounded-lg"
          />
        </SwiperSlide>
      ))}
      <button className="custom-prev-mini absolute text-xs top-2/6 left-3 z-10 p-2 text-black bg-[#ffffffa2]
        rounded-full shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-white w-8 transition-all duration-300">
        ❮
      </button>
      <button className="custom-next-mini absolute text-xs top-2/6 right-2 z-10 p-2 text-black bg-[#ffffffa2]
        rounded-full shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100 w-8 transition-all duration-300">
        ❯
      </button>
    </Swiper>
  )
}