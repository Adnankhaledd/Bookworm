import { Product } from './product';
import { shoppingCartItem } from './shopping-cart-item';

export class ShoppingCart { 
  items: shoppingCartItem[] = [];

  constructor(private itemsMap: {[productId: string]: shoppingCartItem}) {
    this.itemsMap = itemsMap || {}; // to make sure it's initailized
    for(let productId in itemsMap){
      let item = itemsMap[productId];
      new shoppingCartItem({
        ...item,
        $key: productId
      });
      this.items.push(new shoppingCartItem({
        ...item,
        $key: productId
      }))
    }
  }
  
  getQuantity(product: Product) {
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) 
      sum += this.items[productId].totalPrice;
    return sum;
  }
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) 
      count += this.itemsMap[productId].quantity;
    return count;
  }
}