import { Global, Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ArticlesController,
  RubriquesController,
  SousRubriquesController,
} from './controller';
import {
  ArticlesMercurialesService,
  RubriquesService,
  SousRubriquesService,
} from './service';
//import { RubriqueMercurialeEntity } from '@entities/rubrique-mercuriale.entity';
import { SousRubriqueMercurialeEntity } from '@entities/sous-rubriques-mercuriales.entity';
import { ArticleMercurialeEntity } from '@entities/article-mercuriale.entity';

@Global()
@Module({
  controllers: [
    ArticlesController,
    SousRubriquesController,
    RubriquesController,
  ],
  providers: [
    ArticlesMercurialesService,
    SousRubriquesService,
    RubriquesService,
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ArticleMercurialeEntity,
      //RubriqueMercurialeEntity,
      SousRubriqueMercurialeEntity,
    ]),
  ],
  exports: [
    TypeOrmModule,
    ArticlesMercurialesService,
    SousRubriquesService,
    RubriquesService,
  ],
})
export class MercurialeModule {}
