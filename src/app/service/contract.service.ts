import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private contractUrl = 'http://localhost:3000/api/contract';

    constructor(private http: HttpClient) { }

    getContractData(): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');

        return this.http.get(this.contractUrl, {
            headers: headers
        });
    }
}