import { Component, OnInit   } from '@angular/core';
import { PostsService } from "../posts/posts.service";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PhotoDialogComponent } from './photoDialog/photoDialog.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public photosUrl: string[] =[];
  private postsSub: Subscription;

  constructor(public postsService: PostsService,
    public dialog: MatDialog,
    private overlay: Overlay) { }

  
  ngOnInit() {
    this.postsService.getPhotos();
    this.postsSub = this.postsService.getPhotoUpdateListener()
      .subscribe((urls:string[]) =>{
        this.photosUrl = urls.map((item) => { return `../assets/${item}.jpg` });;
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
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

