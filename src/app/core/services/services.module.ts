import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesComponent} from "./services.component";
import {ServicesListComponent} from "./services-list/services-list.component";
import {ServicesService} from "./services.service";
import {PreloaderLocalModule} from "../../shared/preloader-local/preloader-local.module";

@NgModule({
    imports: [
        CommonModule,
        PreloaderLocalModule,
    ],
    declarations: [
        ServicesComponent,
        ServicesListComponent,
    ],
    providers: [
        ServicesService,

    ],
})
export class ServicesModule {
}
