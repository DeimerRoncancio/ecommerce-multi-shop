import { useEffect, useState } from "react";
import { ProductTypes } from "../../products/types/product";
import { productToCar } from "../mappers/items-mapper";
import { useCartStore } from "../storage/cart";

export default function useCart() {
  const { cartItems, addItem, setItemsFromStorage, removeItem } = useCartStore();
  const [ itemsQuantity, setItemsQuantity ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState(0);

  const handleAddItem = (product: ProductTypes) => {
    const productItem = productToCar({ product, quantity: 1, isExists: true });
    addItem(productItem);
  }

  const handleRemoveItem = (product: ProductTypes) => {
    const productItem = cartItems.find(item => item.id === product.id);
    if (!productItem) return;
    
    const itemToRemove = { ...productItem, quantity: 1 }
    removeItem(itemToRemove);
  }

  const loadItemsFromStorage = () => {
    if (!cartItems.length) setItemsFromStorage();
  }

  useEffect(() => {
    const totalQuantity = cartItems.reduce((sum, item) => sum += item.quantity, 0);
    if (itemsQuantity === totalQuantity) return;
    
    const totalPrice = cartItems.reduce((sum, item) => 
      sum += item.productPrice * item.quantity, 0
    );
    
    setItemsQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  }, [cartItems])

  return {
    items: cartItems,
    totalPrice,
    itemsQuantity,
    handleAddItem,
    handleRemoveItem,
    loadItemsFromStorage,
  }
}
