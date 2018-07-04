import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContactUsComponent} from "./contact-us.component";
import {ContactUsStartComponent} from "./contact-us-start/contact-us-start.component";

const contactUsRoutes: Routes = [
    {
        // path: '', component: ContactUsComponent, children: [
        //     {path: '', component: ContactUsStartComponent},
        // ]
        path: '', component: ContactUsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contactUsRoutes),
    ],
    exports: [RouterModule],
})
export class ContactUsRoutingModule {
}
