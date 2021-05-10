//interface to define the oject

export interface Product {
    $key: string;
    title: string;
    author: string;
    price: number;
    category: string;
    imageUrl: string;
}