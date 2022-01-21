import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGradeDTO } from '@modules/grades/dto/create-grade.dto';
import { CreateCategorieAgentsDTO } from '@modules/categories-agents/dto/create-categories-agents.dto';

export class EditAgentDTO {
  public id?: number;

  @ApiProperty({ example: 'P0145258521421M', required: true })
  @IsNotEmpty()
  @Length(7, 7)
  public matricule: string;

  @ApiProperty({ example: 'nom', required: false })
  public nom: string;

  @ApiProperty({ example: 'prenom', required: false })
  public prenom: string;

  @ApiProperty({
    example: new Date().toISOString(),
    required: false,
    nullable: true,
  })
  @IsDateString()
  @IsOptional()
  public dateNaissance: Date | string | undefined;

  @ApiProperty({ example: '', required: false })
  public lieuNaissance: string;

  @ApiProperty({ example: 'ref_acte_recrutement', required: false })
  public refActeRecrutement: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsDateString()
  @IsOptional()
  public dateRecrutement: Date | string;

  @ApiProperty({ example: '', required: false })
  signataireActeRecrutement: string;

  @ApiProperty({ example: '', required: false })
  public structureRattach: string;

  @ApiProperty({ example: '', required: false })
  public serviceRattach: string;

  @ApiProperty({ example: '', required: false })
  public refActeAffectation: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsDateString()
  @IsOptional()
  public dateSignAffectation: Date | string;

  @ApiProperty({ example: '', required: false })
  public signataireActeAffectation: string;

  @ApiProperty({ example: '', required: false })
  public posteTravail: string;

  @ApiProperty({ example: '', required: false })
  public fonction: string;

  @ApiProperty({ example: '', required: false })
  public refActeNomination: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsDateString()
  @IsOptional()
  public dateNomination: Date | string;

  @ApiProperty({ example: '', required: false })
  public signataireNomination: string;

  @ApiProperty({ example: '1', required: false })
  public echelon: number;

  @ApiProperty({ example: '2', required: false })
  public indice: number;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsDateString()
  @IsOptional()
  public dateSignNomination: Date | string;

  @ApiProperty({ example: '', required: false })
  public signataireActeNomination: string;

  @ApiProperty({ example: '', required: false })
  public grade: CreateGradeDTO;

  @ApiProperty({ example: '', required: false })
  public categorie: CreateCategorieAgentsDTO;
}
