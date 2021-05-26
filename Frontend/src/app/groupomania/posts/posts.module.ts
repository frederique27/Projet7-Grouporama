import { NgModule, Sanitizer } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PostsRoutingModule } from "./posts.routing.module";
import { PostListComponent } from "./post-list/post-list.component";
import { PostFormComponent } from "./post-form/post-form.component";
import {NgDompurifyModule} from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [
    PostListComponent,
    PostFormComponent,
  ],
  imports: [
    PostsRoutingModule,
    SharedModule,
    NgDompurifyModule
  ],
  providers: [
  ],
})
export class PostsModule { }