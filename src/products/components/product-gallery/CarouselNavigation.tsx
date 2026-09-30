import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductImageType } from "../../types/product";
import ProductImage from "../../../shared/ui/ProductImage";

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
          className="flex! aspect-square cursor-pointer items-center justify-center overflow-hidden
            border-2 border-line bg-base-100 p-1.5 transition-colors hover:border-(--cat,var(--color-brand))
            [&.swiper-slide-thumb-active]:border-(--cat,var(--color-brand))"
        >
          <ProductImage src={image.imageUrl} width={200} alt={image.name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
