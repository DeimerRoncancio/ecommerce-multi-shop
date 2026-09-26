import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductsFromApiType } from "../../types/product";
import RecommendationItem from "./RecommendationItem";
import { useNavigate } from "react-router";

type Props = {
  products: ProductsFromApiType[];
};

const arrowStyles = `absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center
  rounded-full border border-line bg-base-100 text-ink shadow-card transition-colors
  hover:border-brand hover:text-brand`;

export default function ProductRecommendations({ products }: Props) {
  const navigate = useNavigate();

  return (
    <div className="relative px-4 md:px-12">
      <Swiper
        modules={[Navigation]}
        loop
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        className="w-full !pb-2"
      >
        {products.map((product, index) => (
          <SwiperSlide
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="!flex cursor-pointer flex-col rounded-2xl border border-line bg-base-100 p-4
              transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <RecommendationItem product={product} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button type="button" aria-label="Anterior" className={`custom-prev left-0 ${arrowStyles}`}>
        <FiChevronLeft size={20} />
      </button>
      <button type="button" aria-label="Siguiente" className={`custom-next right-0 ${arrowStyles}`}>
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}
