import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../service.model";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  @Input() services: Service[];

  constructor() { }

  ngOnInit() {
  }

}
