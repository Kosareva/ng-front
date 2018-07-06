import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-preloader-local',
    templateUrl: './preloader-local.component.html',
    styleUrls: ['./preloader-local.component.scss']
})
export class PreloaderLocalComponent implements OnInit {

    @Input('loading') loading: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
