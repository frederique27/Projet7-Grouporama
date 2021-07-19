import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { AuthGuardService } from "../../guards/auth-guard";
import { OnePostComponent } from "./one-post/one-post/one-post.component";

const routes: Routes = [
    { path: '', canActivate: [AuthGuardService], component: PostListComponent },
    { path: 'new', canActivate: [AuthGuardService], component: PostFormComponent },
    { path: ':id/like', canActivate: [AuthGuardService], component: OnePostComponent },
    { path: ':id/comment', canActivate: [AuthGuardService], component: OnePostComponent },
    { path: ':id', canActivate: [AuthGuardService], component: OnePostComponent },
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
