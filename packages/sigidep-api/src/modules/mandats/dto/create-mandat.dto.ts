import { CreateEngagementJuridiqueDTO } from '@modules/engagement-juridiques/dto/create-engagement-juridique.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CreateFactureDTO } from './create-facture.dto';
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

  @ApiProperty({
    type: () => CreateFactureDTO,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @Type(() => CreateFactureDTO)
  facture?: CreateFactureDTO;
}
