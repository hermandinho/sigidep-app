import { CreateEngagementJuridiqueDTO } from '@modules/engagement-juridiques/dto/create-engagement-juridique.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreateMandatDTO {
  id?: number;

  @ApiProperty({ example: 'CARNET0001', required: false })
  numero!: string;

  @ApiProperty({
    type: () => CreateEngagementJuridiqueDTO,
    nullable: true,
    required: false,
  })
  @IsOptional()
  numActeJuridique?: CreateEngagementJuridiqueDTO;
}
