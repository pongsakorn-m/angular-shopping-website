import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public cartService: CartService, private authService: AuthService) { }

  cartQuantity: Observable<number> = this.cartService.getQuantity();
  isAuthen: Observable<boolean> = this.authService.isAuthenticated();

  logout() {
    this.authService.logout();
  }

}
