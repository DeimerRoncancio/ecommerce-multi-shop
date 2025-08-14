import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductsFromApiType } from "../types/product";
import Rating from "../../wishlist/components/Rating";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

type Props = {
  products: ProductsFromApiType[]
}

export default function ProductRecommendations({ products }: Props) {
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
        rounded-2xl hover:shadow-[0_0_10px_2px_#ececec] transition-shadow duration-300">
          <div className="w-full h-60 flex items-center justify-center p-3 rounded-2xl">
            <img src={product.productImages[0].imageUrl} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div>
              <ul className="flex gap-2 text-sm text-[#737373]">
                {
                  product.categories.slice(0, 2).map(cat =>
                    <li key={cat.categoryName}>
                      {cat.categoryName.toUpperCase()}
                    </li>
                  )
                }
              </ul>
              <h2 className="font-medium">{product.productName}</h2>
            </div>
            <Rating index={index} />
            <p className="text-lg font-bold text-[#101828]">
              $ {new Intl.NumberFormat('es-ES').format(product.price)}
            </p>
            <button className="btn btn-info flex gap-4 bg-[#f04913] border-[#f04913] text-white rounded-lg
            shadow-none outline-none w-full mt-4">
              <FiShoppingCart size={17} />
              Agregar al carrito
            </button>
          </div>
          <button className="absolute top-5 z-10 p-2 right-5 text-black bg-white rounded-xl
          shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100 ">
            <CiHeart size={20} color="#767676" />
          </button>
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
