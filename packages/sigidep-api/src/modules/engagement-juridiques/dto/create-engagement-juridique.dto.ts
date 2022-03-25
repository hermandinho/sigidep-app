import { ApiProperty } from '@nestjs/swagger';

export class CreateEngagementJuridiqueDTO {
  id?: number;
  @ApiProperty({ type: 'float', example: '00015-4521368', required: false })
  public montantAE: number;

  @ApiProperty({ type: 'enum', example: 'CANCEL', required: false })
  public etat: string;

  @ApiProperty({ required: false })
  public exercise: string;

  @ApiProperty({ required: false })
  public codeProcedure: string;

  @ApiProperty({ required: false })
  public reference: string;

  @ApiProperty({ required: false })
  public dateSignature: Date;

  @ApiProperty({ required: false })
  public signataire: string;

  @ApiProperty({ required: false })
  public objet: string;

  @ApiProperty({ required: false })
  public subProgram: string;
  @ApiProperty({ required: false })
  public action: string;

  @ApiProperty({ required: false })
  public activity: string;

  @ApiProperty({ required: false })
  public task: string;

  @ApiProperty({ required: false })
  public adminUnit: string;

  @ApiProperty({ required: false })
  public paragraph: string;

  @ApiProperty({ required: false })
  public imputation: string;

  @ApiProperty({ example: '55CE00-00000', required: false })
  public numero: string;
}
