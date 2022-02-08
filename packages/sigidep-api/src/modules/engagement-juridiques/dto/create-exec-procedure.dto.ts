import { EtatEngagementEnum } from '@entities/engagement-juridique-entity';
import { CreateAdministrativeUnitDto } from '@modules/administrative-units/dto/create-administrative-unit.dto';
import { CreateExecProcedureDTO } from '@modules/exec-procedures/dto/create-exec-procedure.dto';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';
import { CreateSubProgramActionDto } from '@modules/sub-programs/dto/create-sub-program-action.dto';
import { CreateSubProgramActivityTaskDto } from '@modules/sub-programs/dto/create-sub-program-activity-task.dto';
import { CreateSubProgramActivityDto } from '@modules/sub-programs/dto/create-sub-program-activity.dto';
import { CreateSubProgramDto } from '@modules/sub-programs/dto/create-sub-program.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEngagementJuridiqueDTO {
  @ApiProperty({
    type: () => CreateExecProcedureDTO,
    nullable: true,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  public procedure: CreateExecProcedureDTO;

  @ApiProperty({
    type: () => CreateExerciseDto,
    nullable: true,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  public exercise: CreateExerciseDto;

  @ApiProperty({
    type: () => CreateSubProgramDto,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public sousProgramme: CreateSubProgramDto;

  @ApiProperty({
    type: () => CreateSubProgramActionDto,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public action: CreateSubProgramActionDto;

  @ApiProperty({
    type: () => CreateSubProgramActivityDto,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public activity: CreateSubProgramActivityDto;

  @ApiProperty({
    type: () => CreateSubProgramActivityTaskDto,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public task: CreateSubProgramActivityTaskDto;

  @ApiProperty({ example: 'REF', required: false })
  public reference: string;

  @ApiProperty({ example: '1', required: false })
  public numero: number;

  @ApiProperty({ example: '00015-4521368', required: false })
  public imputation: string;

  @ApiProperty({
    type: () => CreateAdministrativeUnitDto,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public adminUnit: CreateAdministrativeUnitDto;

  @ApiProperty({ type: 'float', example: '00015-4521368', required: false })
  public montantAE: number;

  @ApiProperty({ type: 'enum', example: 'CANCEL', required: false })
  public etat: EtatEngagementEnum;
}
