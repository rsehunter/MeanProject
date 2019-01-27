import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts/posts.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  private photosUrl: string[] =[];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) { }

  
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

}
