import { EncoursEntity } from "@entities/encours.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DetailsVirementsDTO {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    codeInput: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    libelleInput!: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    isCredit: boolean;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    montant: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    encour: EncoursEntity;

    constructor(params?: Partial<DetailsVirementsDTO>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}