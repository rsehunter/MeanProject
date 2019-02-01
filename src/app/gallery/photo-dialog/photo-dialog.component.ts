import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Photo } from '../photo.model';
import { PostsService } from "../../posts/posts.service";

@Component({
  selector: 'photo-dialog',
  templateUrl: 'photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    public photoService: PostsService,
    @Inject(MAT_DIALOG_DATA) public photo: Photo, ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(photoId: string): void {
    this.photoService.deletePhoto(photoId);
    this.dialogRef.close();
  }

  convertUrl(url: string): string {
    return "./assets/" + url + ".jpg";
  }
}
