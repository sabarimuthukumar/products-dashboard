export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ChartData {
    name: string;
    y: number;
}

export interface FilterProps {
    productDetails: (newData: ChartData[]) => void;
    priceDetails: (newData: (ProductWithPriceProps | null)[] | undefined) => void;
}
export interface ProductWithPriceProps {
    product: string;
    price: number;
}

export interface ChartsProps {
    productDetails: ChartData[];
    priceDetails: (ProductWithPriceProps | null)[] | undefined
}