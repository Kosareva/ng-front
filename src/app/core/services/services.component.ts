import {Component, OnInit} from '@angular/core';
import {ServicesService} from "./services.service";
import {Observable} from "rxjs/internal/Observable";
import {Service} from "./service.model";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
})

export class ServicesComponent implements OnInit {

    title = 'Services';
    services$: Observable<Service[]>;
    service: Service;

    constructor(private servicesService: ServicesService) {
    }

    ngOnInit() {
        this.services$ = this.servicesService.getServices();
    }

}
