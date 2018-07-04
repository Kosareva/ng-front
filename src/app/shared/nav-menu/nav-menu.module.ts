import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavMenuComponent} from './nav-menu.component';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        NavMenuComponent,
    ],
    exports: [
        NavMenuComponent
    ]
})
export class NavMenuModule {
}
