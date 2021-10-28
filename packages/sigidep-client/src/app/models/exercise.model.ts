export interface ExerciseModel {
  startDate: Date;
  endDate: Date;
  status: ExerciseStatusType;
}

export type ExerciseStatusType = 'hidden' | 'active' | 'archived' | 'preparing';
