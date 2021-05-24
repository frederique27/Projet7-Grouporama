import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InterfaceHttp } from "./interface.http";

@Injectable ({ providedIn: 'root'})

export class TestHttp extends InterfaceHttp {
    getTest(): Observable<any>{
        return this.httpClient.get<any>(`${this.url}posts`)
    }
    postTest(formData: FormData){
        return this.httpClient.post(`${this.url}posts`, formData)
    }
} 