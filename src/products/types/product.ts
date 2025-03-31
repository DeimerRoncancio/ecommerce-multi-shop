export interface ProductTypes {
    id: string;
    productName: string;
    description: string;
    price: number;
    productImages: ProductImage[];
    categories: CategoryType[];
}

export interface CategoryType {
    categoryName: string;
}

export interface ProductImage {
    name: string;
    imageUrl: string;
    imageId: string;
}
