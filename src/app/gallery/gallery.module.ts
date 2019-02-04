import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { GalleryComponent } from "./gallery.component";
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoCreateComponent } from './photo-create/photo-create.component';
import { MapComponent } from "../map/map.component";
import { AppRoutingModule } from '../app-rounting.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutingModule
  ],
  exports: [
    GalleryComponent, PhotoListComponent, PhotoCreateComponent
  ],
  declarations: [
    MapComponent,
    GalleryComponent, 
    PhotoListComponent, 
    PhotoCreateComponent]
})
export class GalleryModule { }
