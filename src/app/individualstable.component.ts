import {Component, ViewChild, OnInit} from '@angular/core';

import {MdPaginator} from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-corporations-table',
  // styleUrls: ['individualstable.component.css'],
  templateUrl: 'individualstable.component.html',
})
export class IndividualsTableComponent implements OnInit {
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
// {name:"Name"},{name:"Address Type"},{name:"Street"},{name:"City"},{name:"State"},{name:"Zip Code"}]'
 //  @ViewChild(MdPaginator) paginator: MdPaginator;

  ngOnInit() {

  }
}
