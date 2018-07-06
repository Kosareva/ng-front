import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesService} from "./services.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
})

export class ServicesComponent implements OnInit, OnDestroy {

    services$: Observable;
    title = 'Services';

    constructor(private servicesService: ServicesService) {
    }

    ngOnInit() {
        this.services$ = this.servicesService.getServices();
    }

    ngOnDestroy() {
    }

}
