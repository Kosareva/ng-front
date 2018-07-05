import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class ServicesService {

    private services = [];
    servicesFetched = new Subject();

    constructor(private httpClient: HttpClient) {
    }

    fetchServices() {

        const authHeader = new HttpHeaders().set('Authorization', '160f6b8e551b36fae8ae8fc4dc704b685c0380c9');

        return this.httpClient.get('http://504080.com/api/v1/services/categories', {
            headers: authHeader,
        });
            // .subscribe(
            //     (services: any) => {
            //         this.setServices(services.data);
            //     },
            //     (error) => {
            //         console.log(error);
            //     });

    }

    setServices(services) {
        this.services = services;
        this.servicesFetched.next(this.services.slice());
    }

    getServices() {
        return this.services.slice();
    }

}
