export interface ProductTypes {
    id: string;
    name: string;
    description: string;
    price: number;
    images: ProductImageType[];
    categories: CategoryType[];
}

export interface CategoryType {
    categoryName: string;
}

export interface ProductImageType {
    name: string;
    imageUrl: string;
    imageId: string;
}

export interface ProductsFromApi {
    id: string;
    productName: string;
    description: string;
    price: number;
    productImages: ProductImageType[];
    categories: CategoryType[];
}
