import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../../guards/auth-guard";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
    { path: '', canActivate: [AuthGuardService], component: ProfileComponent },
    { path: 'users', canActivate: [AuthGuardService], component: ProfileComponent },
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

export class ProfileRoutingModule{}