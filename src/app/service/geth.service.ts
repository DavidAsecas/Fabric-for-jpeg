import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GethRequest } from '../interface/gethRequest';


@Injectable({
    providedIn: 'root'
})
export class GethService {
    private gethUrl = 'http://localhost:3000/api/geth';
    constructor(private http: HttpClient) { }

    createBlockchain(req: GethRequest): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.post(this.gethUrl, JSON.stringify(req), {
            headers: headers
        });
    }

    connectToBlockchain(req: GethRequest): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.post(this.gethUrl, JSON.stringify(req), {
            headers: headers
        });
    }
}