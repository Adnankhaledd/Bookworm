import { Product } from "./product";

export class shoppingCartItem {
    $key: string;
    title: string;
    author: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<shoppingCartItem>){
        Object.assign(this, init) //initialize the object
    }
    get totalPrice() {
        return this.price * this.quantity;
    }
}