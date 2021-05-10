import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth.routing.module";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
  ],
})
export class AuthModule { }