import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { Photo } from '../photo.model';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';
import { PostsService } from "../../posts/posts.service";

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  public cols = 3;
  public photos: Photo[] = [];
  private photoSub: Subscription;
  private isLoading = false;
  constructor(
    public postsService: PostsService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.postsService.getPhotos();
    this.isLoading = true;
    this.photoSub = this.postsService.getPhotoUpdateListener()
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
        this.isLoading = false;
      })
  };

  ngOnDestroy() {
    this.photoSub.unsubscribe();
  }

  openDialog(photo: Photo): void {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: photo,
      scrollStrategy,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  convertUrl(url: string): string {
    return "./assets/" + url + ".jpg";
  }
}

