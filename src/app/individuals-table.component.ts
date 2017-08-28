import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IndividualEntity} from './model/individual-entity';
import {Page} from './model/page';
import {IndividualEntitiesService} from './service/individual-entities-service';

@Component({
  selector: 'app-individuals-table',
  providers: [
    IndividualEntitiesService
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './individuals-table.component.html',
  styleUrls: ['./individuals-table.component.scss']
})
export class IndividualsTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<IndividualEntity>();

  constructor(private individualEntitiesService: IndividualEntitiesService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.individualEntitiesService.getData( this.page, this.rows );
  }

}
