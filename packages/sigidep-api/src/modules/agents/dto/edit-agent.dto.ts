import { IsDateString, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRegimeFiscalDTO } from '@modules/regime-fiscal/dto/create-regime-fiscal.dto';
import { CreateBankDto } from '@modules/banks-agences/dto/create-banks.dto';
import { CreateAgenceDto } from '@modules/banks-agences/dto/create-agence.dto';
import { GradeEntity } from '@entities/grade.entity';
import { CreateGradeDTO } from '@modules/grades/dto/create-grade.dto';
import { CreateCategorieAgentsDTO } from '@modules/categories-agents/dto/create-categories-agents.dto';

export class EditAgentDTO {
  public id?: number;

  @ApiProperty({ example: 'P0145258521421M', required: true })
  @IsNotEmpty()
  public matricule: string;

  @ApiProperty({ example: 'nom', required: false })
  public nom: string;

  @ApiProperty({ example: 'prenom', required: false })
  public prenom: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsDateString()
  public dateNaissance: Date | string;

  @ApiProperty({ example: '', required: false })
  public lieuNaissance: string;

  @ApiProperty({ example: 'ref_acte_recrutement', required: false })
  public refActeRecrutement: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
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
  public dateNomination: Date | string;

  @ApiProperty({ example: '', required: false })
  public signataireNomination: string;

  @ApiProperty({ example: '1', required: false })
  public echelon: number;

  @ApiProperty({ example: '2', required: false })
  public indice: number;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsDateString()
  public dateSignNomination: Date | string;

  @ApiProperty({ example: '', required: false })
  public signataireActeNomination: string;

  @ApiProperty({ example: '' })
  public grade: CreateGradeDTO;

  @ApiProperty({ example: '' })
  public categorie: CreateCategorieAgentsDTO;
}
