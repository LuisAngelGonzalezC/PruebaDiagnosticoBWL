import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  code: number = null;
  
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private token: TokenService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.message = null;
    if(this.route.snapshot.queryParamMap.get('code') && this.route.snapshot.queryParamMap.get('message')){
      this.code = parseInt(this.route.snapshot.queryParamMap.get('code'));
      this.message = this.route.snapshot.queryParamMap.get('message');
      switch (this.code) {
        case 201:
          this.toastr.success(this.message, 'Completado:');
          break;
        case 401:
          this.toastr.warning(this.message, 'Error:');
          break;
        default:
          break;
      }
    }
    this.router.navigate(['/'], {
      queryParams: {
        message: null,
        code: null,
      },
      queryParamsHandling: 'merge'
    });

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ["", Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(16)
      ])]
    });
  }
  
  login() {
    if(this.loginForm.valid){
      this.loginForm.disable();
      this.message = null;

      this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe({
        next: data => {
          this.token.setToken(data.accessToken);
          this.token.setUser(data.user);
        },
        error: error => {
          this.loginForm.enable();
          this.message = error.error.message;
          this.toastr.warning(this.message, 'Error:');
        },
        complete: () => {
          this.router.navigateByUrl('/dashboard');
        }
      })
    }
  }
}
