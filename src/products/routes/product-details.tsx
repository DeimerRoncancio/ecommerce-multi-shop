import { FaMinus, FaPlus } from "react-icons/fa6";
import Rating from "../../wishlist/components/Rating";
import ProductGallery from "../components/ProductGallery";
import { getProduct, getProducts } from "../services/products.api";
import { Route } from "./+types/product-details";
import Breadcrumb from "../../profile/components/Breadcrumb";
import { FaCheckCircle } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosHeartEmpty, IoMdStarOutline } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiShoppingCart, FiZap } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import 'swiper/css/navigation';

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  const products = await getProducts();
  return { product, products };
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product, products } = loaderData;

  return (
    <>
      <div className="bg-[#fff4ef]">
        <div className="ajust-width flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold">{product.productName}</h1>
          <div className="breadcrumbs text-sm">
            <Breadcrumb />
          </div>
        </div>
      </div>
      <div className="ajust-width grid grid-cols-2 gap-6 pt-14">
        <div className="relative w-full mx-auto">
          <ProductGallery images={product.productImages} />
        </div>
        <div className="flex flex-col gap-5 text-[#101828]">
          <div>
            <div className=" flex items-center justify-between">
              <ul className="flex gap-2">
                {
                  product.categories.map(cat =>
                    <p className="text-[#7a7c7f] text-sm">{cat.categoryName.toUpperCase()}</p>
                  )
                }
              </ul>
              <Rating index={4} />
            </div>
            <h2 className="text-3xl text-[#5e472d] font-medium">
              {product.productName}
            </h2>
          </div>

          <h2 className="text-3xl text-[#5e472d] font-medium">
            $ {new Intl.NumberFormat("es-ES").format(product.price)}
          </h2>

          <h2 className="text-[#4a5565]">
            <p className="text-[#364153] font-medium">Descripción</p>
            {product.description}
          </h2>

          <div className="flex items-center gap-2">
            <FaCheckCircle color="#198754" />
            <p>In Stock</p>
          </div>

          <div className="flex flex-col">
            <p className="text-[#364153] font-medium mb-2">Cantidad</p>
            <div className="flex">
              <div className="flex items-center">
                <button className="btn btn-soft rounded-r-none rounded-l-2 bg-white border-[1px] 
                border-[#7c290850]">
                  <FaMinus />
                </button>
                <input
                  value={`1`} className="input w-15 h-full bg-white border-[1px] border-y-[#7c290850] 
                  border-x-0 rounded-none !outline-none text-center
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                />
                <button className="btn btn-soft rounded-l-none rounded-r-2 bg-white border-[1px] 
                border-[#7c290850]">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mr-6">
            <div className="flex flex-col">
              <button className="btn btn-info bg-[#f04913] border-[#f04913] text-white rounded-2xl shadow-none
              outline-none">
                <IoBagHandleOutline size={17} />
                Agregar al carrito - $18000
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn btn-outline btn-primary border border-gray-300 rounded-2xl 
              hover:bg-gray-100 hover:text-black shadow-none">
                <IoIosHeartEmpty size={17} />
                Agregar a lista de deseos
              </button>
              <button className="btn btn-outline btn-primary border border-gray-300 rounded-2xl
              hover:bg-gray-100 hover:text-black focus-visible:!outline-[#f04913] shadow-none">
                <AiOutlineThunderbolt size={17} />
                Comprar ahora
              </button>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 rounded-3xl mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FiZap className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium">Rapido envío</p>
                <p className="text-sm text-gray-600">Envío gratuito en 2 días</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <IoMdStarOutline className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium">1 año de garantia</p>
                <p className="text-sm text-gray-600">Completa cobertura</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CiHeart className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium">Devolución: 30 días</p>
                <p className="text-sm text-gray-600">Sin preguntas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen flex flex-col text-black border-b border-[#e5e5e5]">
        <div className="ajust-width flex flex-col items-center !mt-20 !mb-10 gap-4">
          <h2 className="text-3xl font-bold">Encuentra lo que quieres</h2>
          <h2 className="text-[#4a5565]">
            Descubre productos que suplan todas tus necesidades. Los mejores productos de tecnología
            y videojuegos están aquí.
          </h2>
        </div>
        <Swiper modules={[Navigation]} loop spaceBetween={10} slidesPerView={5} navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
        }} className="w-full">
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
      </div>
    </>
  )
}
