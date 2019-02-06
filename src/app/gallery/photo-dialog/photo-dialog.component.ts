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
  tooltipText: string;
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

  onLikeClick(photoId: string) {
    if(this.photo.liked.includes(this.authService.getUserId())){
      this.photo.liked = this.photo.liked.filter((id) => id!==this.authService.getUserId())
    }
    else{
      this.photo.liked.push(this.authService.getUserId());
    }

    this.photoService.likedPhoto(photoId, this.photo.liked).subscribe(
      responseData => {
      this.liked = this.photo.liked.includes(this.authService.getUserId());
      this.tooltipText = `${this.photo.liked.length} like${(this.photo.liked.length>1? 's':'')}`;
    },
  error =>{
    console.log(error.error.message);
    this.authService.openSnackBar(error.error.message);
  });
  }

  convertUrl(url: string): string {
    return "./assets/" + url + ".jpg";
  }

  ngOnInit() {
    this.isAuth = this.authService.getAuthStatus();
    this.authListenserSubs = this.authService
      .getAuthenStatusListener().subscribe(result => {
        this.isAuth = result;
      });
    this.liked = this.photo.liked.includes(this.authService.getUserId());
    this.tooltipText = `${this.photo.liked.length} like${(this.photo.liked.length!=1? 's':'')}`;
  }

  ngOnDestroy() {
    this.authListenserSubs.unsubscribe();
  }
}
