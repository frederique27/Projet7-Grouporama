import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth.routing.module";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    AuthRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
  ],
})
export class AuthModule { }