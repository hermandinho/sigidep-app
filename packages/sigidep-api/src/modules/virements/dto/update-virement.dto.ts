import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateVirementDto } from './create-virement.dto';

export class UpdateVirementDto extends PartialType(CreateVirementDto) {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public validCible?: boolean;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public validSource?: boolean;
}
