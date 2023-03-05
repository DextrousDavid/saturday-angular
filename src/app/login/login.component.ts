import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../usersInterface/usersInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: User[] | any = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  //Login Form
  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  });

  //Login Form
  submitLoginForm() {
    if (this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.username).subscribe((res) => {
        this.user = res;
        if (this.user.password === this.loginForm.value.password) {
          if (this.user.isActive) {
            sessionStorage.setItem('user name', this.user.id);
            sessionStorage.setItem('user role', this.user.role);
            this.toastr.success('Login Successfull!');
            this.router.navigate(['']);
          } else {
            this.toastr.error('Inactive user', 'Please contact Admin');
          }
        } else {
          this.toastr.error('Invalid details');
        }
      });
    }
  }
}
