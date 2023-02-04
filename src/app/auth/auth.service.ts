import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { BASE_URL } from '../shared/cosnstants/url';

export interface LoginResponse {
  token: string;
}

export class Login {
  username!: string;
  password!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService,
              private http: HttpClient,
              private route: Router) { }

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject(this.tokenValid());

  isAuthenticated(): Observable<boolean> {
    return this.isAuth.asObservable().pipe((u) => {
      if (!!u) {
        return u
      }
      return of(this.tokenValid())
    });
  }

  tokenValid() {
    var result = localStorage.getItem("token") != null && !this.jwtHelper.isTokenExpired(localStorage.getItem("token"))
    console.log(result);
    return result;
  }

  login(username: string, password: string) {
    let data: Login = new Login();
    data.username = username;
    data.password = password;
    this.http.post<LoginResponse>(BASE_URL + "Login", data).subscribe((loginResponse: LoginResponse) => {
      if (loginResponse && loginResponse.token) {
        this.isAuth.next(true);
        localStorage.setItem("token", loginResponse.token);
        this.route.navigate(["home"]);
      }
    });
  }

  logout() {
    this.isAuth.next(false);
    this.clearToken();
    this.route.navigate(["login"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  clearToken() {
    localStorage.removeItem("token");
  }
}
