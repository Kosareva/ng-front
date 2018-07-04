import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
    {path: '', loadChildren: './core/core.module#CoreModule'},
    {path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
})

export class AppRoutingModule {
}
