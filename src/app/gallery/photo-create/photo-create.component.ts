import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../../posts/posts.service";

@Component({
  selector: "app-photo-create",
  templateUrl: "./photo-create.component.html",
  styleUrls: ["./photo-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public photosService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.photosService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
