import { IsEnum, IsNotEmpty, Length } from 'class-validator';
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

  @ApiProperty({ example: 'date_naissance', required: false })
  public dateNaissance: Date;

  @ApiProperty({ example: 'lieu_naissance', required: false })
  public lieuNaissance: string;

  @ApiProperty({ example: 'ref_acte_recrutement', required: false })
  public refActeRecrutement: string;

  @ApiProperty({ example: 'date_recrutement', required: false })
  public dateRecrutement: Date;

  @ApiProperty({ example: 'signataire_acte_recrutement', required: false })
  signataireActeRecrutement: string;

  @ApiProperty({ example: 'structure_rattach', required: false })
  public structureRattach: string;

  @ApiProperty({ example: 'service_rattach', required: false })
  public serviceRattach: string;

  @ApiProperty({ example: 'ref_acte_affectation', required: false })
  public refActeAffectation: string;

  @ApiProperty({ example: 'date_signature_affectation', required: false })
  public dateSignAffectation: Date;

  @ApiProperty({ example: 'signataire_acte_affectation', required: false })
  public signataireActeAffectation: string;

  @ApiProperty({ example: 'poste_travail', required: false })
  public posteTravail: string;

  @ApiProperty({ example: 'fonction', required: false })
  public fonction: string;

  @ApiProperty({ example: 'ref_acte_nomination', required: false })
  public refActeNomination: string;

  @ApiProperty({ example: 'date_nomination', required: false })
  public dateNomination: Date;

  @ApiProperty({ example: 'signataire_nomination', required: false })
  public signataireNomination: string;

  @ApiProperty({ example: 'echelon', required: false })
  public echelon: number;

  @ApiProperty({ example: 'indice', required: false })
  public indice: number;

  @ApiProperty({ example: 'date_sign_Nomination', required: false })
  public dateSignNomination: Date;

  @ApiProperty({ example: 'signataire_acte_nomination', required: false })
  public signataireActeNomination: string;

  @ApiProperty({ example: 'grade' })
  public grade: CreateGradeDTO;

  @ApiProperty({ example: 'categorie' })
  public categorie: CreateCategorieAgentsDTO;
}
