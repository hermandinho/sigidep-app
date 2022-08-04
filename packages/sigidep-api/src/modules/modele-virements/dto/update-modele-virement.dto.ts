import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateModeleVirementDto } from './create-modele-virement.dto';

export class UpdateModeleVirementDto extends PartialType(CreateModeleVirementDto) {

    public id?: number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public nomModel: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public enteteModel: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public chapeauModel: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public contenuModel: string;
}
