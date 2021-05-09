import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthuserPageRoutingModule } from './authuser-routing.module';

import { AuthuserPage } from './authuser.page';

//component
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthuserPageRoutingModule
  ],
  declarations: [
    AuthuserPage,
    LoginComponent,
    RegisterComponent
    
  ]
})
export class AuthuserPageModule {}
