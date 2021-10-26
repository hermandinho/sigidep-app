import { Component, OnInit } from '@angular/core';
import {AppService} from "@services/app.service";

@Component({
  selector: 'app-erercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  selectedItems: any[] = [];
  constructor(
    private readonly _appService: AppService,
  ) { }

  ngOnInit(): void {
    this._appService.setAppBreadcrumb([
      {
        label: 'CCCC'
      }
    ])
  }

  openForm() {

  }

  edit(item: any) {


  }

  delete(item: any) {

  }
}
