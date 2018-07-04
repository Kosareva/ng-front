import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactUsComponent} from "./contact-us.component";
import {ContactUsRoutingModule} from "./contact-us-routing.module";
import {ContactUsStartComponent} from './contact-us-start/contact-us-start.component';

@NgModule({
    declarations: [
        ContactUsComponent,
        ContactUsStartComponent,
    ],
    imports: [
        CommonModule,
        ContactUsRoutingModule,
    ],
})
export class ContactUsModule {
}
