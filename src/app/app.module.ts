import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { GalleryModule } from "./gallery/gallery.module";
import { AuthModule } from "./auth/auth.module";
import { PhotoDialogComponent } from "./gallery/photo-dialog/photo-dialog.component";
import { AppRoutingModule } from './app-rounting.module'
import { AngularMaterialModule } from "./angular-material.module";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    WelcomeComponent,
    PhotoDialogComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GalleryModule,
    AppRoutingModule,
    AngularMaterialModule,
    AuthModule
  ],
  providers: [],
  entryComponents: [PhotoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

