import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactUsComponent} from "./contact-us.component";
import {ContactUsRoutingModule} from "./contact-us-routing.module";
import {ContactUsFormModule} from "./contact-us-form/contact-us-form.module";

@NgModule({
    declarations: [
        ContactUsComponent,
    ],
    imports: [
        CommonModule,
        ContactUsRoutingModule,
        ContactUsFormModule,
    ],
})
export class ContactUsModule {
}
