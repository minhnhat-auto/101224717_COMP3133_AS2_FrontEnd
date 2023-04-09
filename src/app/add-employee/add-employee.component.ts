import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { ADD_EMPLOYEE, GET_EMPLOYEE_BY_ID, UPDATE } from '../graphql.queries';
import { Employee } from '../models/employee';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addedNewEmployee: any
  selectEmployee: any

  employee!: Employee
  editedEmp: any
  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router, private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectEmployee = this.route.snapshot.params['id']
    if (this.selectEmployee) {
      this.apollo.watchQuery<any>({
        query: GET_EMPLOYEE_BY_ID,
        variables: {
          "getEmployeeByIdId": this.selectEmployee
        }
      }).valueChanges.subscribe({
        next: (data) => {
          this.employee = data.data.getEmployeeByID
          this.newEmployeeForm.controls['first_name'].setValue(this.employee['first_name'])
          this.newEmployeeForm.controls['last_name'].setValue(this.employee['last_name'])
          this.newEmployeeForm.controls['email'].setValue(this.employee['email'])
          this.newEmployeeForm.controls['gender'].setValue(this.employee['gender'])
          this.newEmployeeForm.controls['salary'].setValue(this.employee['salary'])

          // this.apollo.mutate({
          //   mutation: UPDATE,
          //   variables: {
          //     "updateEmployeeId": this.selectEmployee
          //   }

          //   // {
          //   //   firstName: this.newEmployeeForm.value.first_name,
          //   //   lastName: this.newEmployeeForm.value.last_name,
          //   //   email: this.newEmployeeForm.value.email,
          //   //   gender: this.newEmployeeForm.value.gender,
          //   //   salary: this.newEmployeeForm.value.salary,
          //   // }
          // })
          //   .subscribe({
          //     next: (data) => {
          //       var
          //       this.editedEmp = {

          //       }
          //       // this.newEmployeeForm.reset()
          //     }
          //   })


        }
      }
      )
    }

  }
  newEmployeeForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
    gender: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
  })

  // edit(id: string) {
  //   this.apollo.watchQuery<any>({
  //     query: GET_EMPLOYEE_BY_ID,
  //     variables: {
  //       "getEmployeeByIdId": id
  //     }
  //   }).valueChanges.subscribe({
  //     next: (data) => {
  //       var empById = data.data.getEmployeeByID[0]
  //       this.employee = {
  //         id: empById.id
  //       }
  //     },
  //     error: () => {
  //       console.log("error ne");

  //     }
  //   }
  //   )
  // }

  submitForm() {
    if (this.newEmployeeForm.valid) {
      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: {
          addEmployeeInput: {
            first_name: this.newEmployeeForm.value.first_name,
            last_name: this.newEmployeeForm.value.last_name,
            email: this.newEmployeeForm.value.email,
            gender: this.newEmployeeForm.value.gender,
            salary: this.newEmployeeForm.value.salary,
          }
        }
      })
        .subscribe({
          next: (data) => {
            this.toastr.success('Added Successfully', '')
            console.log(data);
            this.newEmployeeForm.reset()
            this.addedNewEmployee = data
          },
          error: () => {
            this.toastr.error('Added Unsuccessfully', '')
            this.newEmployeeForm.reset()
          }
        })
    }
  }


  getFirstnameErrorMes() {
    if (this.newEmployeeForm.controls['first_name'].hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  getLastnameErrorMes() {
    if (this.newEmployeeForm.controls['last_name'].hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  getEmailErrorMes() {
    if (this.newEmployeeForm.controls['email'].hasError('required')) {
      return 'You must enter a value'
    }

    return this.newEmployeeForm.controls['email'].hasError('pattern') ? 'Not a valid email' : ''
  }


  getGenderErrorMes() {
    if (this.newEmployeeForm.controls['gender'].hasError('required')) {
      return 'You must select a value'
    }
    return ''
  }


  getSalaryErrorMes() {
    if (this.newEmployeeForm.controls['salary'].hasError('required')) {
      return 'You must enter a float number'
    }
    return ''
  }

}
