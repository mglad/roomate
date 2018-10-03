import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faFacebook = faFacebook;
  faSpinner = faSpinner;

  form: FormGroup;
  isRegister = false;

  errorMessage = '';
  emailError: string;
  passwordError: string;
  loading = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginFb() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/dashboard']);
      });
  }

  onSubmit(value) {
    if (!this.validate()) {
        return;
    }

    this.loading = true;
    if (!this.isRegister) {
      this.authService.doLogin(value)
        .then(res => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        }, err => {
          this.loading = false;
          this.errorMessage = err.message;
        });
    } else {
      this.loading = true;
      this.authService.doRegister(value)
        .then(res => {
          this.loading = false;
          this.toggleRegister();
        }, err => {
          this.loading = false;
          this.errorMessage = err.message;
        });
    }
  }

  validate() {
    let valid = true;
    this.emailError = '';
    this.passwordError = '';

    if (!this.email.valid) {
      this.emailError = 'Invalid email';
      valid = false;
    }

    if (!this.password.valid) {
      this.passwordError = 'Invalid password';
      valid = false;
    }
    return valid;
  }

  toggleRegister() {
    this.isRegister = !this.isRegister;
    this.form.reset();
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';
  }

  get email(): AbstractControl { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
