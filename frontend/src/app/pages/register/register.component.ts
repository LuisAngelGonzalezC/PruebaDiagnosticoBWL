import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { mustMatch } from '../../helpers/must-match';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.message = null;
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ["", Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(16)
      ])],
      password_confirmation: ["", Validators.compose([
        Validators.required
      ])],
      fullname: ["", Validators.compose([
        Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z ]+$')
      ])]
    },
    {
      validator: mustMatch('password', 'password_confirmation')
    });
  }
  
  register() {
    if(this.registerForm.valid) {
      this.registerForm.disable();
      this.message = null;
      this.auth.register(this.registerForm.controls.email.value,
                        this.registerForm.controls.password.value,
                        this.registerForm.controls.fullname.value)
      .subscribe({
        next: data => {
          this.message = data.message;
        },
        error: error => {
          this.registerForm.enable();
          this.message = error.error.message;
          this.toastr.warning(this.message, 'Error:');
        },
        complete: () => {          
          this.router.navigate(['/'], {queryParams: {message: this.message, code: 201}});
        }
      })
    }
  }
}
