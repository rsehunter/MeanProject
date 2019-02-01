import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private photos: string[] = [];
  private photosUpdated = new Subject<string[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        BACKEND_URL + "/posts"
      )
      .pipe(map((postData)=>{
        return postData.posts.map(post =>{
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
      .get<{message: string; photos: string[] }>(
        BACKEND_URL + "/photos"
      )
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
}
