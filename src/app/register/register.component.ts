import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  //Registration Form
  registrationForm = this.formBuilder.group({
    id: this.formBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    email: this.formBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(false),
  });

  // Submit Registration form
  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      this.service
        .proceedWithRegistration(this.registrationForm.value)
        .subscribe({
          next: (res: any) => {
            console.log('Successfully Posted with Registration Form!', res);
            this.toastr.success(
              'Please Contact Admin to Enable Access.',
              'Registration Successful!'
            );
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Unfortunately, An error Occured', error);
            this.toastr.warning('Please Enter valid Details');
            // this.toastr.warning('Please enter valid details');
          },
          complete: () => {
            console.log('Complete method from Register Component!;');
          },
        });
    }
  }
}
