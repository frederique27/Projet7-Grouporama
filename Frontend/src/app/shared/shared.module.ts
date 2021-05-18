import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from '../interceptor/auth-interceptors';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // CommonModule,
        // BrowserModule

    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
})

export class SharedModule { }