import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloaderLocalComponent} from './preloader-local.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PreloaderLocalComponent,
    ],
    exports: [
        PreloaderLocalComponent,
    ]
})
export class PreloaderLocalModule {
}
