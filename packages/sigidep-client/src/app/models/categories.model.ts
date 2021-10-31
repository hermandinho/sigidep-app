export class CategoryModel {
  id!: number;
  code!: string;
  label!: string;

  constructor(param: Partial<CategoryModel>) {
    Object.assign(this, param);
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.label}`;
  }
}
