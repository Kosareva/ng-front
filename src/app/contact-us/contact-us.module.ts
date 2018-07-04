import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactUsComponent} from "./contact-us.component";
import {ContactUsRoutingModule} from "./contact-us-routing.module";
import {Header2Module} from "../shared/header2/header2.module";

@NgModule({
    declarations: [
        ContactUsComponent,
    ],
    imports: [
        CommonModule,
        ContactUsRoutingModule,
        Header2Module,
    ],
})
export class ContactUsModule {
}
