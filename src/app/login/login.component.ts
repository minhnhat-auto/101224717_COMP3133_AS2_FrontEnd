import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { LOGIN_USER } from '../graphql.queries';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: any = []

  constructor(private apollo: Apollo, private router: Router, private toastr: ToastrService) {
    sessionStorage.clear()
  } 

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  submitLogin() {
    if (this.loginForm.valid) {
      this.apollo.watchQuery<any>({
        query: LOGIN_USER,
        variables: {
          loginInput: {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password,
          }
        }
      }).valueChanges
        .subscribe({
          next: (data) => {
            this.userData = data
            console.log(data.data.loginUser.password);

            if (this.userData.data.loginUser.id) {
              sessionStorage.setItem('username', this.userData.id)
              this.router.navigate([''])
            }
          },
          error: () => {
            this.toastr.error('Login Unsuccessfully', '')
            this.loginForm.reset()
          }
        })
    }
  }

  getUsernameErrorMes() {
    if (this.loginForm.controls['username'].hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  getPasswordErrorMes() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You enter a value'
    }

    return this.loginForm.controls['password'].hasError('minlength') ? 'Must be at least 8 characters long' : ''
  }

}
