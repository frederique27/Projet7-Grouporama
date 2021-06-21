import { NgModule, Sanitizer } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ProfileRoutingModule } from "./profile.routing.module";

@NgModule({
  declarations: [

  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
  ],
  providers: [
  ],
})
export class ProfileModule { }