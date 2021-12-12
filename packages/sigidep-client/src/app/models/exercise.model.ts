export class ExerciseModel {
  id!: number;
  code!: number;
  year!: number;
  startDate!: Date;
  endDate!: Date;
  status!: ExerciseStatusType;

  constructor(params?: Partial<ExerciseModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.year}`;
  }
}

export type ExerciseStatusType =
  | 'hidden'
  | 'in_progress'
  | 'archived'
  | 'preparing'
  | 'following';
