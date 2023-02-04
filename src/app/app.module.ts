import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shell/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodComponent } from './components/food/food.component';
import { CartComponent } from './components/cart/cart.component';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaymentComponent } from './components/payment/payment.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FoodComponent,
    CartComponent,
    AddCartComponent,
    LoginComponent,
    ToolbarComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:5000"],
        disallowedRoutes: []
      }
    }),
    ToastrModule.forRoot({ timeOut: 2000}),
    ToastContainerModule,
    HttpClientModule
  ],
  entryComponents: [
    AddCartComponent,
    PaymentComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
