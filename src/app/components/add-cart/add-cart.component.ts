import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              public cartService: CartService,
              public toastr: ToastrService) { }

  @Input() initialData: Food = new Food();
  quantity:number = 1;

  ngOnInit(): void {

  }

  closeModal() {
    this.activeModal.close();
  }

  addToCart() {
    this.cartService.addItem(this.initialData, this.quantity);
    this.toastr.success(this.initialData.name + " add to cart successfully");
    this.closeModal();
  }

}
