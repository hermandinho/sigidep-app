/*
 * Built with ❣️ by El Manifico
 *
 * Email: hdemsongtsamo@gmail.com
 * Date: 12/11/21, 1:26 PM
 */
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { managementModeEnum } from '@entities/sub-program-activity-task-operation.entity';
import { Type } from 'class-transformer';

export class CreateSubProgramActivityTaskOperationDto {
  @ApiProperty({ example: 'Super Opération', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Super Operation', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'Deliverable', required: true })
  @IsNotEmpty()
  public deliverablesEn: string;

  @ApiProperty({ example: 'Livrable', required: true })
  @IsNotEmpty()
  public deliverablesFr: string;

  @ApiProperty({ example: 'Verification source', required: true })
  @IsNotEmpty()
  public verificationSourceEn: string;

  @ApiProperty({ example: 'SOurce de verification', required: true })
  @IsNotEmpty()
  public verificationSourceFr: string;

  @ApiProperty({ example: 'XX XX XX XXXXXX XXXXXX XXX', required: true })
  @IsNotEmpty()
  public imputation: string;

  @ApiProperty({ example: 'Bafoussam', required: true })
  @IsNotEmpty()
  public locality: string;

  @ApiProperty({ example: 'Super User', required: true })
  @IsNotEmpty()
  public managerName: string;

  @ApiProperty({
    // example: managementModeEnum.CD,
    required: true,
    type: 'emum',
    enum: managementModeEnum,
  })
  @IsNotEmpty()
  public managementMode: managementModeEnum;

  @ApiProperty({ example: 10000, required: true })
  @IsNotEmpty()
  public paymentCreditN1: number;

  @ApiProperty({ example: 10000, required: true })
  @IsNotEmpty()
  public paymentCreditN2: number;

  @ApiProperty({ example: 10000, required: true })
  @IsNotEmpty()
  public paymentCreditN3: number;

  @ApiProperty({ example: 30000, required: true })
  @IsNotEmpty()
  public engagementAuthorization: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public paragraphId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public regionId: number;

  // @ApiProperty({ example: 1, required: true })
  // @IsNotEmpty()
  // public taskId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public arrondissementId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public departmentId: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PhysicalUnitItem)
  physicalUnits?: PhysicalUnitItem[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ChronogramItem)
  chronogram?: ChronogramItem[];
}

class PhysicalUnitItem {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  unitPrice: number;
}

class ChronogramItem {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  value: number;
}
