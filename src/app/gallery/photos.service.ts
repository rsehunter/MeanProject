import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { Photo } from "../gallery/photo.model";
import { SnackBarComponent} from '../auth/login/snack-bar.component';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PhotosService {
  private photos: Photo[] = [];
  private photosUpdated = new Subject<Photo[]>();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    public snackBar: MatSnackBar
  ) { }

  deletePhoto(photoId: string) {
    this._http.delete<{ message: string }>(BACKEND_URL + "/photos/" + photoId)
      .subscribe(responseData => {
        const updatedPhotos = this.photos.filter(photo => photo.id !== photoId);
        this.photos = updatedPhotos;
        this.photosUpdated.next([...this.photos]);
        this.openSnackBar(responseData.message);
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
      });
  }

  getPhoto(photoid: string) {
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
        photo.id = responseData.photoId;
        this.photos.push(photo);
        this.photosUpdated.next([...this.photos]);
        this.openSnackBar(responseData.message);
        this._router.navigate(["/gallery"]);
      });
  }

  updatePhoto(id: string, caption: string, location: string, url: string) {
    const photo: Photo = { id: id, caption: caption, location: location, url: url };

    this._http.put<{message: any}>
      (BACKEND_URL + "/photos/" + id, photo)
      .subscribe(responseData => {
        this._router.navigate(["/gallery"]);
        this.openSnackBar(responseData.message);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 500
    });
  }


}
