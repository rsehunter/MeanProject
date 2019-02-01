import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent} from './posts/post-list/post-list.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { PhotoListComponent} from './gallery/photo-list/photo-list.component';
import { PhotoCreateComponent} from './gallery/photo-create/photo-create.component';

const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'createphoto', component: PhotoCreateComponent },
    { path: 'create', component: PostCreateComponent },
    { path: 'gallery', component: PhotoListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}