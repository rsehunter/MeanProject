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

  constructor(private photoService: PhotosService) { }

  ngOnInit() {
    this.photoService.getPhotos();
    this.isLoading = true;

    this.photoSub = this.photoService.getPhotoUpdateListener().subscribe(
      photos => {
        this.photos = photos;
        this.displayPhotos = photos;
        this.isLoading = false;
      }
    );
  }
  ngOnDestroy() {
    this.photoSub.unsubscribe();
  }
  public title = "All";

  onLocationSelected(location: string) {
    this.title = location;
    this.displayPhotos = this.photos.filter(photo => photo.location === location);
    console.log(this.displayPhotos);
  }
  onSelectAll() {
    this.title = "All";
    this.displayPhotos = this.photos;

  }
}

