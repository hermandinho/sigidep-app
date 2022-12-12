import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StructuresService } from '../../services/structures.service';

@Component({
  selector: 'app-print-info-user',
  templateUrl: './print-info-user.component.html',
  styleUrls: ['./print-info-user.component.scss']
})
export class PrintInfoUserComponent implements OnInit {
  data: any;
  structure: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private structuresService: StructuresService
  ) { }

  ngOnInit(): void {
    this.getStructure()
    this.data = this.config.data?.item;
  }
  getStructure(){
    this.structuresService.getStructureDefault().then(result =>{
      this.structure = result;
      console.log(result)
    })
  }

}
