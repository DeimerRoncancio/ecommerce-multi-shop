import { FaMinus, FaPlus } from "react-icons/fa6";
import Rating from "../../wishlist/components/Rating";
import ProductGallery from "../components/ProductGallery";
import { getProduct } from "../services/products.api";
import { Route } from "./+types/product-details";
import Breadcrumb from "../../profile/components/Breadcrumb";
import { FaCheckCircle } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosHeartEmpty, IoMdStarOutline } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiZap } from "react-icons/fi";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  return { product };
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <>
      <div className="bg-[#fff4ef]">
        <div className="ajust-width flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold">Producto</h1>
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
              <div className="flex items-center gap-1 rounded-lg border-1 border-[#7c290850]">
                <button className={`btn btn-soft bg-white border-white`}>
                  <FaMinus />
                </button>
                <input
                  value={`1`} className="input w-10 h-7 text-center p-0 focus:outline-none focus:ring-0"
                  type="number"
                />
                <button className="btn btn-soft bg-white border-white">
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
                  <p className="font-medium">Fast Delivery</p>
                  <p className="text-sm text-gray-600">Free 2-day shipping</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <IoMdStarOutline className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium">1-Year Warranty</p>
                  <p className="text-sm text-gray-600">Full Apple coverage</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CiHeart className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-gray-600">No questions asked</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
