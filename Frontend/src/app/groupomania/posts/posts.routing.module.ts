import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { AuthGuardService } from "../../guards/auth-guard";

const routes: Routes = [
    { path: 'posts', canActivate: [AuthGuardService], component: PostListComponent },
    { path: 'posts/new', canActivate: [AuthGuardService], component: PostFormComponent },
    { path: 'posts/:id', canActivate: [AuthGuardService], component: PostListComponent },
    { path: 'posts/like', canActivate: [AuthGuardService], component: PostListComponent },
    { path: 'posts/comment', canActivate: [AuthGuardService], component: PostListComponent },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule 
    ],
    providers: [
        AuthGuardService
    ]
})

export class PostsRoutingModule{}
