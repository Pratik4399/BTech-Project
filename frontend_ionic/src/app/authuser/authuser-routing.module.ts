import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthuserPage } from './authuser.page';
//components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthuserPage,
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '',
        redirectTo:'login',
        pathMatch: 'full'
      }
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthuserPageRoutingModule {}
