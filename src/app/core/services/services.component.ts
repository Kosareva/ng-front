import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesService} from "./services.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {

    title = 'Services';
    services;
    subscription: Subscription;

    constructor(private servicesService: ServicesService) {
    }

    ngOnInit() {
        this.servicesService.fetchServices()
            .subscribe((services: any) => {
                console.log('services: ', services);
                this.servicesService.setServices(services.data);
            });
        // .subscribe(
        //     (services: any) => {
        //         this.servicesService.setServices(services.data);
        //     },
        //     (error) => {
        //         this.errors.push(error.error.error.description);
        //     });
        this.subscription = this.servicesService.servicesFetched.subscribe((services) => {
            this.services = services;
        });
        this.services = this.servicesService.getServices();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
