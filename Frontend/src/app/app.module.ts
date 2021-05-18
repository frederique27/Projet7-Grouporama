import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { AuthService } from './services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './groupomania/posts/posts.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './groupomania/header/header.component'; 
import { CommonModule } from '@angular/common';
// import { EditorModule } from '@tinymce/tinymce-angular';


const appRoutes: Routes = [ 
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'posts', loadChildren: () => import('./groupomania/posts/posts.module').then(m => m.PostsModule)},
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', redirectTo: 'posts' }
]; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(appRoutes),
    AuthModule,
    PostsModule,
    BrowserModule,
    CommonModule
    // EditorModule
  ],
  providers: [
    AuthService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
