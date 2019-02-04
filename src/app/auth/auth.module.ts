import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
