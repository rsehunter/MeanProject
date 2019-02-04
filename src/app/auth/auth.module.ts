import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
