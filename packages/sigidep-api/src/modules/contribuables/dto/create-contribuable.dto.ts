import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegimeFiscalEnum } from '@utils/regime-fiscal.enum';

export class CreateContribuableDTO {
  @ApiProperty({ example: 'P0145258521421M', required: true })
  @IsNotEmpty()
  @MinLength(14)
  @MaxLength(14)
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

  @ApiProperty({ example: 'email@example.com', required: true })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: '10005', required: true })
  @IsNotEmpty()
  public rib: string;
}
