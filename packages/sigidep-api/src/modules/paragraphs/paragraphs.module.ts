import { Module } from '@nestjs/common';
import { ParagraphsController } from './paragraphs.controller';
import { ParagraphsService } from './paragraphs.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParagraphEntity } from '@entities/paragraph.entity';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';

@Module({
  controllers: [ParagraphsController],
  providers: [ParagraphsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ParagraphEntity]),
    FinancialSourcesModule,
  ],
  exports: [TypeOrmModule, ParagraphsService],
})
export class ParagraphsModule {}
