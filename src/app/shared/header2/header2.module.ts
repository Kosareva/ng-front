import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header2Component} from "./header2.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        Header2Component,
    ],
    exports: [
        Header2Component,
    ]
})
export class Header2Module {
}
