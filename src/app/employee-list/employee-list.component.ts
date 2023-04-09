import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { GET_ALL_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql.queries';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  allEmployee: any = []
  employee: any
  selectEmployee: any
  constructor(private apollo: Apollo, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_ALL_EMPLOYEE
    }).valueChanges.subscribe(({ data }) => {
      // console.log(data);
      this.allEmployee = data.getAllEmployee
    })

  }

  editEmployee(selected: string) {
    this.router.navigate([`add-employee/`, selected], )
  
  }

  deleteEmployee(selected: string) {
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        "deleteEmployeeId": selected
      },
      refetchQueries: [{
        query: GET_ALL_EMPLOYEE
      }]
    }).subscribe(({ data }: any) => {

      this.allEmployee = data.deleteEmployee
      this.toastr.success('Deleted Completly')

    })
  }


}
