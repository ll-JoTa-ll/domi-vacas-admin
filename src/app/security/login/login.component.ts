import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../shared/security.service';
import { User } from '../shared/user.model';
import { Login } from '../shared/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ SecurityService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  user: User;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  isInvalid(control, touched: boolean) {
    return touched ? this.submitted || (control.touched && control.errors != null) : this.submitted && control.errors != null;
  }

  getErrorMessage(control) {
    return control.hasError('required') ? 'Campo requerido' :
    control.hasError('email') ? 'Correo no válido' : '';
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const login = new Login();
    login.email = this.loginForm.controls.user.value;
    login.password = this.loginForm.controls.pass.value;
    this.securityService.login(login).subscribe(
      x => {
        if (x.confirmation && x.data) {
          this.user = x.data;
          sessionStorage.setItem('userId', this.user.id);
          this.router.navigate(['package/list']);
        } else {
          this.openSnackBar('Usuario y/o contraseña incorrectos');
          sessionStorage.setItem('userId', '');
        }
      },
      err => {
        console.log('error: ' + err);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000,
    });
  }

}
