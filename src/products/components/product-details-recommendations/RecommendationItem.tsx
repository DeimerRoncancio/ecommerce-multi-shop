import Rating from "../../../wishlist/components/Rating";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { ProductsFromApiType } from "../../types/product";
import useWishList from "../../../wishlist/hooks/useWishList";
import { mapApiToProducts } from "../../mappers/products.maper";
import { IoMdHeart } from "react-icons/io";
import useCart from "../../../cart/hooks/useCart";

type Props = {
  product: ProductsFromApiType;
  index: number;
};

export default function RecommendationItem({ product, index }: Props) {
  const { isInWishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { handleAddItem, isInCart } = useCart();

  const handleAddToWishList = () => {
    const productToWishList = mapApiToProducts(product);
    handleAddWishListItem(productToWishList);
  };

  const handleAddToCart = () => {
    const productToCart = mapApiToProducts(product);
    handleAddItem(productToCart);
  };

  return (
    <>
      <div className="w-full h-60 flex items-center justify-center p-3 rounded-2xl">
        <img src={product.productImages[0].imageUrl} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div>
          <ul className="flex gap-2 text-sm text-[#737373]">
            {product.categories.slice(0, 2).map(cat =>
              <li key={cat.categoryName}>
                {cat.categoryName.toUpperCase()}
              </li>
            )}
          </ul>
          <h2 className="font-medium">{product.productName}</h2>
        </div>
        <Rating index={index} />
        <p className="text-lg font-bold text-[#101828]">
          $ {new Intl.NumberFormat('es-ES').format(product.price)}
        </p>
        <button className="btn btn-info flex gap-4 bg-[#f04913] border-none text-white rounded-lg
        shadow-none outline-none w-full mt-4 disabled:text-[#946b5a]" 
        disabled={isInCart(product.id)}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart()
        }}>
          <FiShoppingCart size={17} />
          { isInCart(product.id) ? "Producto agregado" : "Agregar al carrito" }
        </button>
      </div>
      <button className="absolute top-5 z-10 p-2 right-5 text-black bg-white rounded-xl
      shadow-[0_0_1px_1px_#d1d5dc] cursor-pointer hover:bg-gray-100"
      onClick={(e) => {
        e.stopPropagation();
        isInWishList(product.id) ? handleRemoveWishListItem(product.id) : handleAddToWishList()
      }}>
        {isInWishList(product.id) ?
          <IoMdHeart size={17} color="#fb2c36" /> :
          <CiHeart size={17} color="#767676" />}
      </button>
    </>
  );
}
