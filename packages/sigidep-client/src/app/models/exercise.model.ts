export interface ExerciseModel {
  id: number;
  startDate: Date;
  endDate: Date;
  status: ExerciseStatusType;
}

export type ExerciseStatusType =
  | 'hidden'
  | 'in_progress'
  | 'archived'
  | 'preparing'
  | 'following';
