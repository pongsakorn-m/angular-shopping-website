import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService)
              {
                this.loginForm = this.createLoginForm();
              }

  loginForm!: FormGroup;
  ngOnInit(): void {

  }

  createLoginForm() {
    let formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })

    return formGroup
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.warning("Please enter your username and password");
      return;
    }
    this.authService.login(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value);
  }
}
