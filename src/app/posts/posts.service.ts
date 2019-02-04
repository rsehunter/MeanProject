import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { Post } from "./post.model";
import { Photo } from "../gallery/photo.model";
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private photos: Photo[] = [];
  private photosUpdated = new Subject<Photo[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        BACKEND_URL + "/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete<{ message: string }>(BACKEND_URL + "/posts/" + postId)
      .subscribe(responseData => {
        console.log(responseData.message, "deleted!");
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }

  deletePhoto(photoId: string) {
    this.http.delete<{ message: string }>(BACKEND_URL + "/photos/" + photoId)
      .subscribe(responseData => {
        console.log(responseData.message, "deleted!");
        const updatedPhotos = this.photos.filter(photo => photo.id !== photoId);
        this.photos = updatedPhotos;
        this.photosUpdated.next([...this.photos]);
      })
  }

  getPhotos() {
    this.http
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
    return this.http
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

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>(BACKEND_URL + "/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  createPhoto(caption: string, location: string, url: string) {
    const photo: Photo = { id: null, caption: caption, location: location, url: url };
    this.http
      .post<{ message: string, photoId: string }>(BACKEND_URL + "/photos", photo)
      .subscribe(responseData => {
        console.log(responseData.message);
        photo.id = responseData.photoId;
        this.photos.push(photo);
        this.photosUpdated.next([...this.photos]);
        this.router.navigate(["/gallery"]);
      });
  }

  updatePhoto(id: string, caption: string, location: string, url: string) {
    const photo: Photo = { id: id, caption: caption, location: location, url: url };
    console.log(photo);

    this.http
      .put(BACKEND_URL + "/photos/"+ id, photo)
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(["/gallery"]);
      });
  }
}
