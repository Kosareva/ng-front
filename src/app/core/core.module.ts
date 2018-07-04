import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HomeComponent} from './home/home.component';
import {HeaderModule} from "../shared/header/header.module";
import {SidebarLeftComponent} from './sidebar-left/sidebar-left.component';
import {SidebarRightComponent} from './sidebar-right/sidebar-right.component';
import {NavMenuModule} from "../shared/nav-menu/nav-menu.module";
import {CoreComponent} from "./core.component";
import {CoreRoutingModule} from "./core-routing.module";
import { ColleagueComponent } from './colleague/colleague.component';
import { CompaniesComponent } from './companies/companies.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
    declarations: [
        CoreComponent,
        SidebarLeftComponent,
        SidebarRightComponent,
        HomeComponent,
        ColleagueComponent,
        CompaniesComponent,
        ServicesComponent,
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        HeaderModule,
        NavMenuModule,
    ],
})

export class CoreModule {

}