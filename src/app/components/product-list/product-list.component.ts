import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;
  previousKeyword: string;
  searchMode: boolean;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const currentKeyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != currentKeyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = currentKeyword;

    this.productService.searchProductsPaginate(currentKeyword,
                                              this.pageNumber - 1,
                                              this.pageSize)
      .subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    const hasCategoryName: boolean = this.activatedRoute.snapshot.paramMap.has('name');
    let previousCategoryId: number;

    if (hasCategoryId) {
      if (this.currentCategoryId) {
        previousCategoryId = this.currentCategoryId;
      }
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (hasCategoryName) {
      this.currentCategoryName = this.activatedRoute.snapshot.paramMap.get('name');
    } else {
      this.currentCategoryName = 'Books';
    }

    if (previousCategoryId && this.currentCategoryId != previousCategoryId) {
      this.pageNumber = 1;
    }

    this.productService.getProductListPaginate(this.currentCategoryId,
                                              this.pageNumber - 1,
                                              this.pageSize)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

  private processResult() {
    return productsData => {
      this.products = productsData._embedded.products;
      this.pageNumber = productsData.page.number + 1;
      this.pageSize = productsData.page.size;
      this.totalElements = productsData.page.totalElements;
    }
  }
}
