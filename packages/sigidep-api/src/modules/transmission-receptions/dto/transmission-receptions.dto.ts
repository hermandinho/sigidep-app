import { CreateBonEngagementDTO } from '@modules/bons-engagements/dto/create-bon-engagement.dto';
import { CreateEngagementJuridiqueDTO } from '@modules/engagement-juridiques/dto/create-engagement-juridique.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class TransmissionReceptionDTO {
  id?: number;

  @ApiProperty({ example: '55B0000001', required: false })
  numero!: string;

  @ApiProperty({
    type: () => CreateBonEngagementDTO,
    nullable: true,
    required: false,
  })
  @IsOptional()
  bon_engagement?: CreateBonEngagementDTO[];

}
