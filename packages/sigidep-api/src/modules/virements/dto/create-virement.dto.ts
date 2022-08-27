import { VirementEtatEnum } from "@entities/virement.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateVirementDto {

    @ApiProperty({ example: '123456', required: false })
    @IsNotEmpty()
    public numero: number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public objectVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public dateVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public dateSignatureVirement: Date;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public signataireVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public typeVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public spSourceVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public spCibleVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public etatVirement: VirementEtatEnum;
}
