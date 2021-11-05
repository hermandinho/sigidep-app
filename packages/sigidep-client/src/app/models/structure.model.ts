export class StructureModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  abbreviationFr!: string;
  abbreviationEn!: string;
  descriptionFr!: string;
  descriptionEn!: string;
  missionsFr!: string;
  missionsEn!: string;
  address!: string;

  constructor(params?: Partial<StructureModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }

  public get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }

  public get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }
}
