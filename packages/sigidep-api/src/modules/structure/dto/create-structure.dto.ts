import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStructureDto {
  public id?: number;
  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Super structure', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: false, required: true })
  @IsNotEmpty()
  public estPrincipal: boolean;

  @ApiProperty({ example: 'Super structure En', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac mollis nisl. Sed hendrerit justo ut sagittis tristique. Vivamus vel rhoncus nibh. Aliquam sollicitudin dignissim suscipit. Sed consequat aliquam ante, quis pharetra purus efficitur a. Maecenas euismod quam vitae',
    required: true,
  })
  @IsNotEmpty()
  public descriptionFr: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac mollis nisl. Sed hendrerit justo ut sagittis tristique. Vivamus vel rhoncus nibh. Aliquam sollicitudin dignissim suscipit. Sed consequat aliquam ante, quis pharetra purus efficitur a. Maecenas euismod quam vitae',
    required: true,
  })
  @IsNotEmpty()
  public descriptionEn: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac mollis nisl. Sed hendrerit justo ut sagittis tristique. Vivamus vel rhoncus nibh. Aliquam sollicitudin dignissim suscipit. Sed consequat aliquam ante, quis pharetra purus efficitur a. Maecenas euismod quam vitae',
    required: true,
  })
  @IsNotEmpty()
  public missionsFr: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac mollis nisl. Sed hendrerit justo ut sagittis tristique. Vivamus vel rhoncus nibh. Aliquam sollicitudin dignissim suscipit. Sed consequat aliquam ante, quis pharetra purus efficitur a. Maecenas euismod quam vitae',
    required: true,
  })
  @IsNotEmpty()
  public missionsEn: string;

  @ApiProperty({ example: 'Yaounde', required: true })
  @IsNotEmpty()
  public address: string;

  csv: any;

}
