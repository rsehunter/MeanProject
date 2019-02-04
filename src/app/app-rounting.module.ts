import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PhotoCreateComponent } from './gallery/photo-create/photo-create.component';
import { GalleryComponent } from "./gallery/gallery.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'createphoto', component: PhotoCreateComponent },
    { path: "edit/:photoId", component: PhotoCreateComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }