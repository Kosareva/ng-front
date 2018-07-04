import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "../app-routing.module";

import {HomeComponent} from './home/home.component';
import {HeaderModule} from "../shared/header/header.module";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        HeaderModule,
    ],
    exports: [
        AppRoutingModule,
    ],
    providers: []
})

export class CoreModule {

}