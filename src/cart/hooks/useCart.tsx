import { ProductTypes } from "../../products/types/product";
import { productToCart } from "../mappers/items.mapper";
import { useCartStore } from "../storage/cart";
import { SnackbarUtilities } from "../../shared/utilities/snackbar-manager";

export default function useCart() {
  const { cartItems, addItem, removeItem, clearCart, replaceItems } = useCartStore();
  const itemsQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  const handleAddItem = (product: ProductTypes, quantity: number = 1, notify = true) => {
    const productItem = productToCart({ product, quantity, isExists: true });
    addItem(productItem);
    if (notify) SnackbarUtilities.productAdded("cart", product.name, product.images[0]?.imageUrl);
  };

  const handleRemoveItem = (product: ProductTypes) => {
    const removed = cartItems.find(item => item.id === product.id);
    removeItem(product.id);
    if (removed)
      SnackbarUtilities.productRemoved("cart", removed.productName, removed.productImage, () => addItem(removed));
  };

  const clear = () => {
    const previous = cartItems;
    clearCart();
    if (previous.length)
      SnackbarUtilities.productRemoved(
        "cart",
        `${previous.length} ${previous.length === 1 ? "producto" : "productos"}`,
        undefined,
        () => replaceItems(previous),
        "Carrito vaciado",
      );
  };

  const isInCart = (productId: string) => cartItems.some(item => item.id === productId);

  return {
    cartItems,
    totalPrice,
    itemsQuantity,
    handleAddItem,
    handleRemoveItem,
    isInCart,
    clear,
  };
}
