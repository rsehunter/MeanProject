import { Component, OnInit   } from '@angular/core';
import { PostsService } from "../../posts/posts.service";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  public photos: string[] =[];
  private photoSub: Subscription;

  constructor(public postsService: PostsService,
    public dialog: MatDialog,
    private overlay: Overlay) { }

  
  ngOnInit() {
    this.postsService.getPhotos();
    this.photoSub = this.postsService.getPhotoUpdateListener()
      .subscribe((photos: string[]) =>{
        this.photos = photos;
    })
  };

  ngOnDestroy() {
    this.photoSub.unsubscribe();
  }

  openDialog(photoUrl: string): void{
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
}

