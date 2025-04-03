import { useState } from "react";
import { useCartStore } from "../storage/cart";

export default function useCartItems(itemId: String) {
  const { cartItems, addItem, addItems, removeItem } = useCartStore();
  const item = cartItems.find(item => item.id ===itemId);

  const [ quantity, setQuantity ] = useState(item ? item.quantity : 0);

  const handleRemoveItem = () => {
    if (item) removeItem({ ...item, quantity: 1 });
  }

  const increaseQuantity = () => {
    if (!item) return;
    addItem(item);
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    if (!item) return;
    removeItem(item);
    setQuantity(prev => prev - 1)
  }

  const changeQuantity = (val: number) => {
    setQuantity(val);
  }

  const updateQuantity = () => {
    if (!item) return;
    if (quantity === item?.quantity) return;
    
    quantity === 0
    ? removeItem({ ...item, quantity: 1 })
    : addItems({ ...item, quantity: quantity });
  }

  return {
    quantity,
    handleRemoveItem,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    changeQuantity,
  }
}
