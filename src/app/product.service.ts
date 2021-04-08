import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {
// connect to db
  constructor(private db: AngularFireDatabase) { }
// push product to the database
  create(product){
    this.db.list('product').push(product);
  }
  // Get all products from database
  getAll() {
    return this.db.list('/product')
  }
  // get a product id
  get(productId) {
    return this.db.object('/product/' + productId);
  }
  // update the product
  update(productId, product) {
    return this.db.object('/product/' + productId).update(product);

  }

  delete(productId) {
    return this.db.object('/product/' + productId).remove();
  }
}


