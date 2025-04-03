import { useEffect, useState } from "react";
import { ProductTypes } from "../../products/types/product";
import { productToCar } from "../mappers/items-mapper";
import { useCartStore } from "../storage/cart";

export default function useCart() {
  const { cartItems, addItem, setItemsFromStorage, removeItem } = useCartStore();
  const [ itemsQuantity, setItemsQuantity ] = useState(0);

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
      let totalQuantity = 0;
      
      cartItems.forEach(item => {
        totalQuantity += item.quantity
      });
  
      setItemsQuantity(totalQuantity);
    }, [cartItems])

  return {
    items: cartItems,
    itemsQuantity,
    handleAddItem,
    handleRemoveItem,
    loadItemsFromStorage
  }
}
