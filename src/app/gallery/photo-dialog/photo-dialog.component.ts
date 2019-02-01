import { Component, OnInit, Inject   } from '@angular/core';
import { PostsService } from "../../posts/posts.service";
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Photo } from '../photo.model';

@Component({
  selector: 'photo-dialog',
  templateUrl: 'photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public photo: Photo) {}

  onNoClick(): void {

    this.dialogRef.close();
  }
}
