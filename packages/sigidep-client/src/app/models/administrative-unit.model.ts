import {SectorModel} from "@models/sector.model";
import {CategoryModel} from "@models/categories.model";
import {RegionsModel} from "@models/regions.model";

export class AdministrativeUnitModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  abbreviationFr!: string;
  abbreviationEn!: string;
  sector?: SectorModel;
  category?: CategoryModel;
  function?: FunctionModel;
  region?: RegionsModel;
}

export class FunctionModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  children?: FunctionModel[];
  parent?: FunctionModel;
  sector?: SectorModel;

  constructor(param?: Partial<FunctionModel>) {
    if (param) {
      Object.assign(this, param);
    }
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}
