import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { GalleryComponent } from "./gallery.component";
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoCreateComponent } from './photo-create/photo-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    GalleryComponent, PhotoListComponent, PhotoCreateComponent
  ],
  declarations: [GalleryComponent, PhotoListComponent, PhotoCreateComponent]
})
export class GalleryModule { }
