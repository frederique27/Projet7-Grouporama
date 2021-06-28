import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../interceptor/auth-interceptors';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,    
        FontAwesomeModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        EditorModule,

    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
})

export class SharedModule { }