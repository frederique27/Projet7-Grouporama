import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PostsRoutingModule } from "./posts.routing.module";
import { PostListComponent } from "./post-list/post-list.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { CommonModule } from "@angular/common";
// import { BrowserModule } from '@angular/platform-browser'



@NgModule({
  declarations: [
    PostListComponent,
    PostFormComponent,
  ],
  imports: [
    PostsRoutingModule,
    SharedModule,
    CommonModule
    // BrowserModule
  ],
  providers: [
  ],
})
export class PostsModule { }