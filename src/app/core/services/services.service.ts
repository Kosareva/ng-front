import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";
import {map} from "rxjs/operators";

@Injectable()

export class ServicesService {

    services: Array<any>;

    constructor(private httpClient: HttpClient) {
    }

    getServices(): Observable<Array<any>> {

        if (this.services) {
            return of(this.services);
        } else {

            const authHeader = new HttpHeaders().set('Authorization', 'cfc91f91e85de1b1ac2b487f9d3984ea60260a2e');

            return this.httpClient.get('http://504080.com/api/v1/services/categories', {
                headers: authHeader,
            }).pipe(
                map(res => {
                        this.services = res.data;
                        return res.data;
                    }
                )
            );

        }

    }

}
