import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from 'swiper/modules';
import { ProductImageType } from "../../types/product";
import CarouselNavigation from "./CarouselNavigation";

import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/thumbs";

type Props = {
  images: ProductImageType[]
}

export default function ProductGallery({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        modules={[Thumbs, Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className="border border-[#e5e5e5] rounded-2xl shadow-md"
      >
        {images.sort((a, b) => a.name.localeCompare(b.name)).map((image) => (
          <SwiperSlide key={image.imageId} className="!h-auto !flex items-center !justify-center">
            <img
              src={image.imageUrl}
              alt={`Product image ${image.imageId}`}
              className="w-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselNavigation images={images} setThumbsSwiper={setThumbsSwiper} />

      <button className="custom-prev absolute top-2/6 left-4 z-10 p-2 text-black bg-white rounded-full
        shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100 w-10">
        ❮
      </button>
      <button className="custom-next absolute top-2/6 right-4 z-10 p-2 text-black bg-white rounded-full
        shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100 w-10">
        ❯
      </button>

    </>
  )
}
