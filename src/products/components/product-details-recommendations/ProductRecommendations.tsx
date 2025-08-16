import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductsFromApiType } from "../../types/product";
import RecommendationItem from "./RecommendationItem";
import { useNavigate } from "react-router";

type Props = {
  products: ProductsFromApiType[]
}

export default function ProductRecommendations({ products }: Props) {
  const navigation = useNavigate();
  
  return (
    <Swiper
      modules={[Navigation]}
      loop
      spaceBetween={10}
      slidesPerView={5}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev"
      }}
      className="w-full"
    >
      {products.map((product, index) => (
        <SwiperSlide key={product.id} className="!flex flex-col p-4 border border-[#e5e5e5] my-10 ml-6 
        rounded-2xl hover:shadow-[0_0_10px_2px_#ececec] transition-shadow duration-300 cursor-pointer"
        onClick={() => navigation(`/product/${product.id}`)}>
          <RecommendationItem product={product} index={index} />
        </SwiperSlide>
      ))}
      <button className="custom-prev absolute top-3/6 z-10 p-2 left-4 text-black bg-white rounded-xl
      shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100 w-10">
        ❮
      </button>
      <button className="custom-next absolute top-3/6 z-10 p-2 right-7 text-black bg-white rounded-xl
      shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100 w-10">
        ❯
      </button>
    </Swiper>
  )
}
