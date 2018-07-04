import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
// import {HomeComponent} from "./core/home/home.component";

const appRoutes: Routes = [
    // {path: '', component: HomeComponent},
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
