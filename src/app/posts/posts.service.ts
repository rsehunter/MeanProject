import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Photo } from "../gallery/photo.model";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PostsService {
  private photos: Photo[] = [];
  private photosUpdated = new Subject<Photo[]>();

  constructor(
    private _http: HttpClient, 
    private _router: Router  ) { }

  deletePhoto(photoId: string) {
    this._http.delete<{ message: string }>(BACKEND_URL + "/photos/" + photoId)
      .subscribe(responseData => {
        console.log(responseData.message, "deleted!");
        const updatedPhotos = this.photos.filter(photo => photo.id !== photoId);
        this.photos = updatedPhotos;
        this.photosUpdated.next([...this.photos]);
      })
  }

  getPhotos() {
    this._http
      .get<{ message: string; photos: any }>(BACKEND_URL + "/photos")
      .pipe(map(photoData => {
        return {
          photos: photoData.photos.map(photo => {
            return {
              caption: photo.caption,
              location: photo.location,
              url: photo.url,
              id: photo._id,
            };
          })
        }
      }))
      .subscribe(photoData => {
        this.photos = photoData.photos;
        this.photosUpdated.next([...this.photos]);
        console.log(this.photos)
      });
  }

  getPhoto(photoid: string) {
    console.log(photoid);
    return this._http
      .get<{
        caption: string,
        location: string,
        url: string,
        _id: string
      }>(BACKEND_URL + "/photos/" + photoid);
  }


  getPhotoUpdateListener() {
    return this.photosUpdated.asObservable();
  }

  createPhoto(caption: string, location: string, url: string) {
    const photo: Photo = { id: null, caption: caption, location: location, url: url };
    this._http
      .post<{ message: string, photoId: string }>(BACKEND_URL + "/photos", photo)
      .subscribe(responseData => {
        console.log(responseData.message);
        photo.id = responseData.photoId;
        this.photos.push(photo);
        this.photosUpdated.next([...this.photos]);
        this._router.navigate(["/gallery"]);
      });
  }

  updatePhoto(id: string, caption: string, location: string, url: string) {
    const photo: Photo = { id: id, caption: caption, location: location, url: url };
    console.log(photo);

    this._http
      .put(BACKEND_URL + "/photos/"+ id, photo)
      .subscribe(responseData => {
        console.log(responseData);
        this._router.navigate(["/gallery"]);
      });
  }
  
}
