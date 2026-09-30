import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductsFromApiType } from "../../types/product";
import RecommendationItem from "./RecommendationItem";

type Props = {
  products: ProductsFromApiType[];
};

const arrowStyles = `absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center
  rounded-full border border-line bg-base-100 text-ink shadow-card-hover transition-colors
  hover:border-brand hover:text-brand md:grid`;

export default function ProductRecommendations({ products }: Props) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        loop={products.length > 5}
        spaceBetween={12}
        slidesPerView={2.2}
        breakpoints={{
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        navigation={{ nextEl: ".reco-next", prevEl: ".reco-prev" }}
        className="w-full"
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className="h-auto!">
            <RecommendationItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button type="button" aria-label="Anterior" className={`reco-prev -left-5 ${arrowStyles}`}>
        <FiChevronLeft size={20} />
      </button>
      <button type="button" aria-label="Siguiente" className={`reco-next -right-5 ${arrowStyles}`}>
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}
