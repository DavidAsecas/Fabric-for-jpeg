import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FabricService {

    private fabricUrl = 'http://localhost:3000/api/queryOwner';

    constructor(private http: HttpClient) { }

    queryOwner(channel: string, org: string, image: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.get(this.fabricUrl, {
            headers: headers,
            params: {
                channel: channel,
                org: org,
                image: image
            }
        });
    }
}