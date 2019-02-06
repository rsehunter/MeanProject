import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { Photo } from '../photo.model';
import { PhotosService } from "../photos.service";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'photo-dialog',
  templateUrl: 'photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit, OnDestroy {
  private authListenserSubs: Subscription;
  isAuth = false;
  liked : boolean;
  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    public photoService: PhotosService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public photo: Photo, ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(photoId: string): void {
    this.photoService.deletePhoto(photoId);
    this.dialogRef.close();
  }

  onLikeClick() {
    this.liked = !this.liked;
  }

  convertUrl(url: string): string {
    return "./assets/" + url + ".jpg";
  }

  ngOnInit() {
    this.liked=false;
    this.isAuth = this.authService.getAuthStatus();
    this.authListenserSubs = this.authService
      .getAuthenStatusListener().subscribe(result => {
        this.isAuth = result;
      });
  }

  ngOnDestroy() {
    this.authListenserSubs.unsubscribe();
  }
}
