import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseStatusEnum } from '@entities/exercise.entity';

export const _formatDate = (date: string): Date => {
  const parts = date.split('/');
  return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};

export class CreateExerciseDto {
  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsNotEmpty()
  // @Transform(_formatDate)
  @IsDateString()
  public startDate: Date | string;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsNotEmpty()
  // @Transform(_formatDate, { toClassOnly: true })
  @IsDateString()
  public endDate: Date | string;

  @ApiProperty({
    example: ExerciseStatusEnum.PREPARING,
    type: 'enum',
    enum: ExerciseStatusEnum,
  })
  @IsNotEmpty()
  public status: ExerciseStatusEnum;
}
