import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FabricService {

    private queryUrl = 'http://localhost:3000/api/queryOwner';
    private transactionUrl = 'http://localhost:3000/api/newOwner'

    constructor(private http: HttpClient) { }

    queryOwner(channel: string, org: string, image: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.get(this.queryUrl, {
            headers: headers,
            params: {
                channel: channel,
                org: org,
                image: image
            }
        });
    }

    newOwnerTransaction(channel: string, org: string, image: string, owner: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.post(this.transactionUrl, JSON.stringify({
            channel: channel,
            org: org,
            image: image,
            owner: owner
        }), 
        {
            headers: headers
        });
    }
}