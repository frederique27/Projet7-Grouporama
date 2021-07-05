import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable ({ providedIn: 'root'})

export class InterfaceHttp {
    url: string;

    constructor (protected httpClient: HttpClient) {
        this.url = '/api/';
    }
} 