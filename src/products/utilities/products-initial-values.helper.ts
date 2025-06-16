import { ProductTypes } from "../types/product";

export const ProductsInitialValues: ProductTypes[] = [{
  id: "",
  name: "",
  description: "",
  price: 0,
  categories: [
    {
      categoryName: ""
    }
  ],
  images: [
    {
      imageId: "",
      imageUrl: "",
      name: ""
    }
  ]
}]
