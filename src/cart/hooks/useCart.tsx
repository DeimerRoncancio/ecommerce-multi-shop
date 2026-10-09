import { ProductTypes } from "../../products/types/product";
import { productToCart } from "../mappers/items.mapper";
import { useCartStore } from "../storage/cart";

export default function useCart() {
  const { cartItems, addItem, removeItem, clearCart } = useCartStore();
  const itemsQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  const handleAddItem = (product: ProductTypes, quantity: number = 1) => {
    const productItem = productToCart({ product, quantity, isExists: true });
    addItem(productItem);
  }

  const handleRemoveItem = (product: ProductTypes) => {
    const productItem = cartItems.find(item => item.id === product.id);
    if (!productItem) return;
    
    const itemToRemove = { ...productItem, quantity: 1 }
    removeItem(itemToRemove);
  }

  const clear = () => {
    localStorage.removeItem("cartItems");
    clearCart();
  }

  const isInCart = (productId: string) => cartItems.some(item => item.id === productId)

  return {
    cartItems,
    totalPrice,
    itemsQuantity,
    handleAddItem,
    handleRemoveItem,
    isInCart,
    clear
  }
}
