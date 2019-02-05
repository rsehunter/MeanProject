import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password);
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
