import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Photo } from '../photo.model';
import { PostsService } from "../../posts/posts.service";
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'photo-dialog',
  templateUrl: 'photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent implements OnInit, OnDestroy {
  private authListenserSubs: Subscription;
  private isAuth = false;

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    public photoService: PostsService,
    private authService: AuthService,
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

  ngOnInit() {
    console.log(this.isAuth);
    this.isAuth = this.authService.getAuthStatus();
    this.authListenserSubs = this.authService
      .getAuthenStatusListener().subscribe(result => {
        this.isAuth = result;
        console.log(this.isAuth);
      });
  }

  ngOnDestroy() {
    console.log(this.isAuth);

    this.authListenserSubs.unsubscribe();
  }
}
