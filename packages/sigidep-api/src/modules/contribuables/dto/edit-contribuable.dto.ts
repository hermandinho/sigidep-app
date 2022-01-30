import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRegimeFiscalDTO } from '@modules/regime-fiscal/dto/create-regime-fiscal.dto';
import { CreateBankDto } from '@modules/banks-agences/dto/create-banks.dto';
import { CreateAgenceDto } from '@modules/banks-agences/dto/create-agence.dto';
import { Type } from 'class-transformer';

export class EditContribuableDTO {
  public id?: number;

  @ApiProperty({ example: 'P0145258521421M', required: true })
  @IsNotEmpty()
  @Length(14)
  public code: string;

  @ApiProperty({ example: 'U2G Sarl', required: true })
  @IsNotEmpty()
  public raisonSociale: string;

  @ApiProperty({ example: 'IT', required: true })
  @IsNotEmpty()
  public secteurActivite: string;

  @ApiProperty({ example: 'REEL', required: true })
  @IsNotEmpty()
  @Type(() => CreateRegimeFiscalDTO)
  public regimeFiscal: CreateRegimeFiscalDTO;

  @ApiProperty({ example: 'Rue des banques', required: true })
  @IsNotEmpty()
  public adresse: string;

  @ApiProperty({ example: 'quartier', required: true })
  @IsNotEmpty()
  public quartier: string;

  @ApiProperty({ example: 'Garoua', required: true })
  @IsNotEmpty()
  public localisation: string;

  @ApiProperty({ example: 'Garoua', required: true })
  @IsNotEmpty()
  public siege: string;

  @ApiProperty({ example: 'Garoua', required: true })
  @IsNotEmpty()
  public ville: string;

  @ApiProperty({ example: '669124578', required: true })
  @IsNotEmpty()
  public contact: string;

  @ApiProperty({ example: 'email@example.com', required: false })
  public email: string;

  @ApiProperty({ example: '10005', required: true })
  @IsNotEmpty()
  @Type(() => CreateBankDto)
  public banque: CreateBankDto;

  @ApiProperty({ example: '10005', required: true })
  @IsNotEmpty()
  @Type(() => CreateAgenceDto)
  public agence: CreateAgenceDto;

  @ApiProperty({ example: '10005152462', required: true })
  @IsNotEmpty()
  @Length(11)
  public numeroCompte: string;

  @ApiProperty({ example: '10', required: true })
  @IsNotEmpty()
  @Length(2)
  public cle: string;
}
