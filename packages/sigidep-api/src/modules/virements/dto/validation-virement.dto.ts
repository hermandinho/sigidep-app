import { EncoursEntity } from "@entities/encours.entity";
import { VirementEntity } from "@entities/virement.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ValidationVirementDTO {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    dateSignatureVirement: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    signataireVirement!: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    reference: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    virement: VirementEntity;

    constructor(params?: Partial<ValidationVirementDTO>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}