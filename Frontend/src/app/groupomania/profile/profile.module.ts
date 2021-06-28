import { NgModule, Sanitizer } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile.routing.module";

@NgModule({
  declarations: [
    ProfileComponent

  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
  ],
  providers: [
  ],
})
export class ProfileModule { }