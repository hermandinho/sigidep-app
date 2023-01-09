import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateModeleVirementDto {

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public nomModel: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public enteteModel: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public chapeauModel: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public contenuModel: string;
}
