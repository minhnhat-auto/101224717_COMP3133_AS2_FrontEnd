import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { REGISTER_USER } from '../graphql.queries';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registedUser: any
  error: any

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {

  }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
  })

  submitRegister() {
    if (this.registerForm.valid) {
      this.apollo.mutate({
        mutation: REGISTER_USER,
        variables: {
          registerInput: {
            username: this.registerForm.value.username,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
          }
        }
      })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.registedUser = data;
            this.registerForm.reset()
            this.router.navigate(['login'])
          },
          error: () => {
            this.toastr.error('Register Unsuccessfully', '')
            this.registerForm.reset()
          }
        })
    }
  }

  getUsernameErrorMes() {
    if (this.registerForm.controls['username'].hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  getEmailErrorMes() {
    if (this.registerForm.controls['email'].hasError('required')) {
      return 'You must enter a value'
    }

    return this.registerForm.controls['email'].hasError('pattern') ? 'Not a valid email' : ''
  }

  getPasswordErrorMes() {
    if (this.registerForm.controls['password'].hasError('required')) {
      return 'You must enter a value'
    }

    return this.registerForm.controls['password'].hasError('minlength') ? 'Must be at least 8 characters long' : ''
  }
}
