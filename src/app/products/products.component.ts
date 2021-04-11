import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(productService: ProductService,  route: ActivatedRoute)  {
    
    productService.getAll().subscribe(products => {
      this.products = products;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        //setting the filtered products array
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category ) :
          this.products;
    });
    })

  }   
}
