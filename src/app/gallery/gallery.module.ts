import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatCardModule,
  MatDialogModule
} from "@angular/material";
import { GalleryComponent } from "./gallery.component";
import { PhotoDialogComponent } from "./photoDialog/photoDialog.component";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    GalleryComponent
  ],
  declarations: [GalleryComponent]
})
export class GalleryModule { }
