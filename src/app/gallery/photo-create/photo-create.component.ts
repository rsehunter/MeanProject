import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Photo } from '../photo.model';

import { PostsService } from "../../posts/posts.service";

@Component({
  selector: "app-photo-create",
  templateUrl: "./photo-create.component.html",
  styleUrls: ["./photo-create.component.css"]
})
export class PhotoCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  imageUrl = ""
  photos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  photo: Photo;
  isLoading = false;


  private mode = "create";
  private photoId: string;

  constructor(
    public photosService: PostsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("photoId")) {
        this.isLoading = true;
        this.photosService.getPhoto(paramMap.get("photoId")).subscribe(photoData => {
          this.isLoading = false;
          this.photo = {
            id: photoData._id,
            caption: photoData.caption,
            location: photoData.location,
            url: photoData.url
          }
          this.imageUrl = "./assets/" + photoData.url + ".jpg";
        })
      }
      else {
        this.photo = {
          id: null,
          caption: null,
          location: null,
          url: null
        }
      }
    })
  }
  onImagePicked() {
    this.imageUrl = "./assets/" + this.photo.url + ".jpg";
    console.log(this.imageUrl);
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.photosService.addPhoto(form.value.caption, form.value.location, form.value.url);
    form.resetForm();
    this.imageUrl = ""
  }
}
