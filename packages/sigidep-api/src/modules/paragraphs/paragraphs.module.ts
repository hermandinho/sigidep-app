import { Module } from '@nestjs/common';
import { ParagraphsController } from './paragraphs.controller';
import { ParagraphsService } from './paragraphs.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParagraphEntity } from '@entities/paragraph.entity';

@Module({
  controllers: [ParagraphsController],
  providers: [ParagraphsService],
  imports: [AuthModule, TypeOrmModule.forFeature([ParagraphEntity])],
  exports: [TypeOrmModule],
})
export class ParagraphsModule {}
