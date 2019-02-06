import { Component, OnInit, OnDestroy } from '@angular/core';
import { Photo } from './photo.model';
import { PhotosService } from "./photos.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  displayPhotos: Photo[] = [];
  photoSub: Subscription;
  private isLoading = false;
  public title = "All";

  constructor(private photoService: PhotosService) { }

  ngOnInit() {
    this.photoService.getPhotos();
    this.isLoading = true;

    this.photoSub = this.photoService.getPhotoUpdateListener().subscribe(
      photos => {
        this.photos = photos;
        if(this.title!=="All"){
          this.displayPhotos = this.photos.filter(photo => photo.location === this.title);
        }else{
          this.displayPhotos = this.photos;
        }
        this.isLoading = false;
      }
    );
  }
  ngOnDestroy() {
    this.photoSub.unsubscribe();
  }

  onLocationSelected(location: string) {
    this.title = location;
    if(this.title!=="All"){
      this.displayPhotos = this.photos.filter(photo => photo.location === this.title);
    }else{
      this.displayPhotos = this.photos;
    }
    console.log(this.displayPhotos);
  }
  onSelectAll() {
    this.title = "All";
    this.displayPhotos = this.photos;

  }
}

