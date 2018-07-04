import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header.component";
import {NavMenuModule} from "../nav-menu/nav-menu.module";

@NgModule({
    imports: [
        CommonModule,
        NavMenuModule,
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent,
    ]
})
export class HeaderModule {
}
