import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import 'rxjs/add/operator/take'; // take something from an observable without unsubscribing;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {

    //get categories to send to the select in the product form
    this.categories$ = categoryService.getCategories();
    // get the id of the edited producted 
    this.id = this.route.snapshot.paramMap.get('id');
    // if there is an id read from firebase
    if(this.id) this.productService.get(this.id).take(1).subscribe(p => {
      this.product = p; 
    })
  }

  // save project and push it to db, returns an object
  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else  this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
    
      
  }

  delete() {
    if(confirm('Are you sure you want to delete this product')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
