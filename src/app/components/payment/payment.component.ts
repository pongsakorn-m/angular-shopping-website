import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService, Item } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(public activeModal: NgbActiveModal,
    public cartService: CartService) { }

  @Input() initialData: any;
  selectionList!: Item[]
  ngOnInit(): void {
    this.selectionList = this.initialData.selected
  }

  closeModal() {
  this.activeModal.close();
  }

  confirmPayment() {
    this.activeModal.close(true);
  }

  get summary() {
    return this.selectionList.reduce((sum, current) => {
      return sum += current.priceAmount;
    }, 0)
  }
}
