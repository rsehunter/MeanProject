import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts/posts.service";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  public photos: string[] = [];
  private photoSub: Subscription;
  public title = "All";
  constructor(public postsService: PostsService,
    public dialog: MatDialog,
    private overlay: Overlay) { }


  openDialog(photoUrl: string): void {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      width: '80%',
      data: photoUrl,
      scrollStrategy,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
  onLocationSelected(location: string){
    this.title = location;
  }

}

