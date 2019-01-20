import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Web3Request } from '../interface/web3Request';


@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private web3Url = 'http://localhost:3000/api/web3';
    constructor(private http: HttpClient) { }

    setWeb3(req: Web3Request): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.post(this.web3Url, req, {
            headers: headers
        });
    }

    uploadId(req: Web3Request): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.post(this.web3Url, req, {
            headers: headers
        });
    }

    getId(): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.get(this.web3Url, {
            headers: headers
        });
    }
}