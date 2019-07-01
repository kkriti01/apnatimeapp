import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './signup/signup.component';
import  {EditUserComponent} from  './users-edit/users-edit.component'


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'Dasboard',
    component: UsersComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
  {
    path: 'AddUser',
    component: RegisterComponent,
    data: {
      title: 'Add User Page'
    }
  },
    {
    path: 'edit-user',
    component: EditUserComponent,
    data: {
      title: 'Edit User Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
