import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegimeFiscalEnum } from '@utils/regime-fiscal.enum';

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
  @IsEnum(RegimeFiscalEnum)
  public regimeFiscal: RegimeFiscalEnum;

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
  @Length(5)
  public codeBanque: string;

  @ApiProperty({ example: '10005', required: true })
  @IsNotEmpty()
  @Length(5)
  public codeAgence: string;

  @ApiProperty({ example: '10005152462', required: true })
  @IsNotEmpty()
  @Length(11)
  public numeroCompte: string;

  @ApiProperty({ example: '10', required: true })
  @IsNotEmpty()
  @Length(2)
  public cle: string;
}
