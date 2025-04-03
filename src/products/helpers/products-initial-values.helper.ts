import { ProductTypes } from "../types/product";

export const ProductsInitialValues: ProductTypes[] = [{
  id: "",
  productName: "",
  description: "",
  price: 0,
  categories: [
    {
      categoryName: ""
    }
  ],
  productImages: [
    {
      imageId: "",
      imageUrl: "",
      name: ""
    }
  ]
}]
