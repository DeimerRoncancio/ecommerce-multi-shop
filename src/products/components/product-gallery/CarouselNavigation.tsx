import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductImageType } from "../../types/product";

import "swiper/css";
import "swiper/css/thumbs";

type Props = {
  images: ProductImageType[];
  setThumbsSwiper: (swiper: any) => void;
};

export default function CarouselNavigation({ images, setThumbsSwiper }: Props) {
  if (images.length < 2) return null;

  return (
    <Swiper
      modules={[Thumbs]}
      onSwiper={setThumbsSwiper}
      spaceBetween={12}
      slidesPerView={4}
      breakpoints={{ 640: { slidesPerView: 5 } }}
      className="mt-4"
    >
      {images.map(image => (
        <SwiperSlide
          key={image.imageId}
          className="!flex aspect-square cursor-pointer items-center justify-center overflow-hidden
            rounded-xl border border-line bg-cream p-2 transition-colors
            [&.swiper-slide-thumb-active]:border-brand"
        >
          <img src={image.imageUrl} alt={image.name} className="h-full w-full object-contain" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
