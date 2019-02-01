import { Component, OnInit, Inject   } from '@angular/core';
import { PostsService } from "../../posts/posts.service";
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'photo-dialog',
  templateUrl: 'photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {

    this.dialogRef.close();
  }
}
