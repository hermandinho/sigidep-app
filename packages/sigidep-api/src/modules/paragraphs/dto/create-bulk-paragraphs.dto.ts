import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateParagraphDto } from '@modules/paragraphs/dto/create-paragraph.dto';
import { Type } from 'class-transformer';

export class CreateBulkParagraphsDto {
  @ApiProperty({
    example: [],
    required: true,
    type: CreateParagraphDto,
    isArray: true,
  })
  @IsNotEmpty()
  @Type(() => CreateParagraphDto)
  @ValidateNested()
  public data: CreateParagraphDto[];
}
