import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";
import { Photo } from "../gallery/photo.model";
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private photos: Photo[] = [];
  private photosUpdated = new Subject<Photo[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        BACKEND_URL + "/posts"
      )
      .pipe(map((postData)=>{
        return postData.posts.map(post =>{
          return {
            id: post._id,
            ...post
          };
        });
      }))
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete<{ message: string }>(BACKEND_URL + "/posts/"+ postId)
      .subscribe(responseData => {
        console.log(responseData.message, "deleted!");
        const updatedPosts = this.posts.filter(post => post.id!== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }

  getPhotos() {
    this.http
      .get<{message: string; photos: any }>(
        BACKEND_URL + "/photos"
      )
      .pipe(map((photoData)=>{
        return photoData.photos.map(photo =>{
          return {
            id: photo._id,
            ...photo
          };
        });
      }))
      .subscribe(photoData => {
        this.photos = photoData.photos;
        this.photosUpdated.next([...this.photos]);

      });
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

  addPhoto(url: string, caption: string, location: string) {
    const photo: Photo = { id: null, url: url, caption: caption, location: location };
    this.http
      .post<{ message: string, photoId: string }>(BACKEND_URL + "/photos", photo)
      .subscribe(responseData => {
        console.log(responseData.message);
        photo.id = responseData.photoId;
        this.photos.push(photo);
        this.photosUpdated.next([...this.photos]);
      });
  }


}
