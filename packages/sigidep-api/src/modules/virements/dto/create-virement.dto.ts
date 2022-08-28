import { DetailsVirementEntity } from "@entities/details-virement.entity";
import { ExerciseEntity } from "@entities/exercise.entity";
import { ModelVirementEntity } from "@entities/model-virement.entity";
import { SubProgramEntity } from "@entities/sub-program.entity";
import { TypeVirementEnum, EtatVirementEnum } from "@entities/virement.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { DetailsVirementsDTO } from "./details-virement.dto";

export class CreateVirementDto {

    @ApiProperty({ example: '123456', required: false })
    @IsNotEmpty()
    public numero: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public objectVirement: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public dateVirement: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public dateSignatureVirement: Date;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public signataireVirement: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public typeVirement: TypeVirementEnum;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public spSourceVirement: SubProgramEntity;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public spCibleVirement: SubProgramEntity;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    public etatVirement: EtatVirementEnum;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public detailsVirementsDebit: DetailsVirementsDTO[];

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public detailsVirementsCredit: DetailsVirementsDTO[];

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public modelVirement: ModelVirementEntity;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    public exercice: ExerciseEntity;
}
