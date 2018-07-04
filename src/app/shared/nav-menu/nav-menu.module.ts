import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavMenuComponent} from './nav-menu.component';

@NgModule({
    imports: [
        CommonModule
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
