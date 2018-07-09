import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactUsFormComponent} from "./contact-us-form.component";
import {ContactUsFormService} from "./contact-us-form.service";
import {PreloaderLocalModule} from "../../shared/preloader-local/preloader-local.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PreloaderLocalModule,
    ],
    declarations: [
        ContactUsFormComponent,
    ],
    providers: [
        ContactUsFormService,
    ],
    exports: [
        ContactUsFormComponent,
    ]
})
export class ContactUsFormModule {
}
