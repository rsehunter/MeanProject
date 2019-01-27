import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatCardModule
} from "@angular/material";
import { GalleryComponent } from "./gallery.component";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    GalleryComponent
  ],
  declarations: [GalleryComponent]
})
export class GalleryModule { }
