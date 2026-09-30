import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductTypes } from "../types/product";

import "swiper/css";
import "swiper/css/navigation";

type Props = {
  products: ProductTypes[];
  renderItem: (product: ProductTypes) => React.ReactNode;
  label: string;
};

const arrowStyles = `absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full
  bg-brand text-white transition-transform hover:scale-110 hover:bg-ink md:grid
  [&.swiper-button-disabled]:hidden`;

export default function ProductCarousel({ products, renderItem, label }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2.15}
        slidesPerGroupAuto
        breakpoints={{
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        onBeforeInit={swiper => {
          const navigation = swiper.params.navigation;
          if (navigation && typeof navigation !== "boolean") {
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        className="-mx-2 -my-3 w-[calc(100%+1rem)] px-2! py-3!"
        aria-label={label}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className="h-auto!">
            {renderItem(product)}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        type="button"
        aria-label={`Anteriores de ${label}`}
        className={`-left-4 ${arrowStyles}`}
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label={`Siguientes de ${label}`}
        className={`-right-4 ${arrowStyles}`}
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
}
