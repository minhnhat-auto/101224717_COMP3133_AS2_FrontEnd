import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Inject } from 'graphql-modules';
import { GET_EMPLOYEE_BY_ID } from '../graphql.queries';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee!: Employee
  selectEmployee: any

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectEmployee = this.route.snapshot.params['id'];
    this.viewDetails()
  
  }


  viewDetails() {
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEE_BY_ID,
      variables: {
        "getEmployeeByIdId": this.selectEmployee
      }
    }).valueChanges.subscribe({
      next: (data) => {
        this.employee = data.data.getEmployeeByID
      },
      error: () => {
        console.log("error ne");

      }
    }
    )
  }



}
