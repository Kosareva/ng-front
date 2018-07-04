import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoreComponent} from "./core.component";
import {HomeComponent} from "./home/home.component";
import {ColleagueComponent} from "./colleague/colleague.component";
import {CompaniesComponent} from "./companies/companies.component";
import {ServicesComponent} from "./services/services.component";

const coreRoutes: Routes = [
    {
        path: '', component: CoreComponent, children: [
            {path: '', redirectTo: '/feed', pathMatch: 'full'},
            {path: 'feed', component: HomeComponent},
            {path: 'colleague', component: ColleagueComponent},
            {path: 'companies', component: CompaniesComponent},
            {path: 'services', component: ServicesComponent},
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(coreRoutes),
    ],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
