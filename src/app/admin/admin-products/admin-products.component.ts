import { Component, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs/observable/from';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { ProductService } from '../../product.service';
import { DataTableResource } from 'angular-4-data-table'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];  
  subscription: Subscription;
  tableResources: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
    // get all products and show them 
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products; 
      this.initializeTable(products)
      
    });

  }
    // intitialize data table
  private initializeTable(products: Product[]){
    
    this.tableResources = new DataTableResource(products);
    this.tableResources.query({ offset: 0  })
      .then(items => this.items = items);
    this.tableResources.count()
      .then(count => {
        this.itemCount = count
      })
  }
// implementing reloading items
  reloadItems(params) {
    if(!this.tableResources) return;

    this.tableResources.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    // check if there is a query and search for it if not return all results
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

    this.initializeTable(filteredProducts)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
