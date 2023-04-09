import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { GET_ALL_EMPLOYEE } from './graphql.queries';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '', component:EmployeeListComponent, canActivate: [AuthGuard]},
  // {path: '', component:EmployeeListComponent},
  {path: 'add-employee/_add', component:AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'add-employee/:id', component:AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: `view-employee/:id`, component:ViewEmployeeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
