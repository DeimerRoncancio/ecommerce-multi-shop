export interface ProductTypes {
    id: string;
    name: string;
    description: string;
    price: number;
    images: ProductImageType[];
    categories: CategoryType[];
}

export interface ProductItemType {
    id: string;
    productName: string;
    price: number;
    mainImage: MainImageType;
    categories: CategoryType[];
}

export interface MainImageType {
    name: string,
    imageUrl: string,
    imageId: string
}

export interface CategoryType {
    categoryName: string;
}

export interface ProductImageType {
    name: string;
    imageUrl: string;
    imageId: string;
}

export interface ProductsFromApiType {
    id: string;
    productName: string;
    description: string;
    price: number;
    productImages: ProductImageType[];
    categories: CategoryType[];
    variants: ProductVariantType[];
}

export interface ProductVariantType {
    name: string;
    tag: string;
    type: string;
    listValues: string[];
}
