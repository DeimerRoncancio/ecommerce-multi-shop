import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductImageType } from "../../types/product";
import CarouselNavigation from "./CarouselNavigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Props = {
  images: ProductImageType[];
};

const arrowStyles = `absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center
  rounded-full border border-line bg-base-100/90 text-ink shadow-card backdrop-blur-sm
  transition-colors hover:border-brand hover:text-brand`;

export default function ProductGallery({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Thumbs, Navigation]}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        loop
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full overflow-hidden rounded-2xl border border-line bg-cream"
      >
        {images
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(image => (
            <SwiperSlide key={image.imageId} className="!flex aspect-square items-center justify-center p-8">
              <img
                src={image.imageUrl}
                alt={image.name}
                className="h-full w-full object-contain"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <button type="button" aria-label="Imagen anterior" className={`custom-prev left-4 ${arrowStyles}`}>
        <FiChevronLeft size={20} />
      </button>
      <button type="button" aria-label="Imagen siguiente" className={`custom-next right-4 ${arrowStyles}`}>
        <FiChevronRight size={20} />
      </button>

      <CarouselNavigation images={images} setThumbsSwiper={setThumbsSwiper} />
    </div>
  );
}
