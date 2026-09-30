import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductImageType } from "../../types/product";
import CarouselNavigation from "./CarouselNavigation";
import { sortImages } from "../../../shared/utilities/image-order";
import ProductImage from "../../../shared/ui/ProductImage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Props = {
  images: ProductImageType[];
};

const arrowStyles = `absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center
  rounded-full bg-base-100 text-ink shadow-card transition-colors
  hover:bg-(--cat,var(--color-brand)) hover:text-white`;

export default function ProductGallery({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const ordered = sortImages(images);

  return (
    <div className="relative">
      <Swiper
        modules={[Thumbs, Navigation]}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        loop
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full overflow-hidden"
      >
        {ordered.map(image => (
          <SwiperSlide key={image.imageId} className="flex! aspect-square items-center justify-center bg-(--cat-soft,var(--color-cream))">
            <ProductImage
              src={image.imageUrl}
              width={1000}
              alt={image.name}
              cutoutClassName="mix-blend-darken"
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

      <CarouselNavigation images={ordered} setThumbsSwiper={setThumbsSwiper} />
    </div>
  );
}
