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
  photos = [1,2,3,4,5,6,7,8,9,10];
  photo: Photo;
  private mode ="create";
  private photoId : string;

  constructor(
    public photosService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if (paramMap.has("photoId")){
        this.photo = {
          id: paramMap.get("photoId"),
          caption:paramMap.get("photoId"),
          location: paramMap.get("photoId"),
          url: paramMap.get("photoId")
        }
      }else{
        console.log("no")
      }
    })
  }
  onImagePicked(event: Event) {
    this.imageUrl = "./assets/"+ event.value + ".jpg";
    console.log(this.imageUrl);
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.photosService.addPhoto(form.value.caption, form.value.location, this.imageUrl);
    form.resetForm();
  }
}
