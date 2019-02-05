import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GalleryModule } from "./gallery/gallery.module";
import { AuthModule } from "./auth/auth.module";
import { PhotoDialogComponent } from "./gallery/photo-dialog/photo-dialog.component";
import { AppRoutingModule } from './app-rounting.module'
import { AngularMaterialModule } from "./angular-material.module";
import { HeaderComponent } from "./header/header.component";
import { SnakeBarComponent } from './auth/login/snack-bar.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PhotoDialogComponent,
    HeaderComponent,
    SnakeBarComponent
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
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  entryComponents: [PhotoDialogComponent, SnakeBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

