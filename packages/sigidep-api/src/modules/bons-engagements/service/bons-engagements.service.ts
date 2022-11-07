import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { BonEngagementEntity } from '@entities/bon-engagement.entity';
import { CreateBonEngagementDTO } from '../dto/create-bon-engagement.dto';
import { EngagementFilter } from '@utils/engagement-filter';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { CreateTraitementBonEngagementDTO } from '../dto/create-traitement-bon-engagement.dto';
import { TraitementBonEngagementEntity } from '@entities/traitement-bon-engagement.entity';
import { PaiementEntity } from '@entities/paiement.entity';
import { FactureArticleEntity } from '@entities/facture-article.entity';
import { getAbbreviation } from '@utils/functions';
import { EngagementJuridiqueService } from '@modules/engagement-juridiques/service/engagement-juridique.service';
import { EngagementJuridiqueEntity } from '@entities/engagement-juridique.entity';
import { response } from 'express';

@Injectable()
export class BonEngagementService {
  constructor(
    @InjectRepository(BonEngagementEntity)
    private readonly repository: Repository<BonEngagementEntity>,

    @InjectRepository(TraitementBonEngagementEntity)
    private readonly traitementBonRepository: Repository<TraitementBonEngagementEntity>,

    @InjectRepository(PaiementEntity)
    private readonly paiementBonRepository: Repository<PaiementEntity>,

    @InjectRepository(FactureArticleEntity)
    private readonly articleRepo: Repository<FactureArticleEntity>,

    @InjectRepository(EngagementJuridiqueEntity)
    private readonly engagementRepo: Repository<EngagementJuridiqueEntity>,
  ) {}

  public getRepository(): Repository<BonEngagementEntity> {
    return this.repository;
  }

  public async getArticles(factureId: number): Promise<FactureArticleEntity[]> {
    const response = this.articleRepo
      .createQueryBuilder('art')
      .leftJoinAndSelect('art.facture', 'facture')
      .leftJoinAndSelect('art.article', 'article')
      /*  .where(factureId != null ? 'facture.id IN(:...codes)' : 'true', {
      codes: [factureId],
    }) */
      .where('facture.id = :code', {
        code: factureId,
      })
      .getMany();
    return response;
  }

  public async filter(
    filter?: EngagementFilter,
  ): Promise<BonEngagementEntity[]> {
    return this.repository
      .createQueryBuilder('bon')
      .leftJoinAndSelect('bon.numActeJuridique', 'eng')
      .leftJoinAndSelect('bon.traitements', 'traitements')
      .leftJoinAndSelect('bon.paiements', 'paiements')
      .leftJoinAndSelect('bon.facture', 'facture')
      .leftJoinAndSelect('facture.articles', 'articles')
      .where(filter?.procedures ? 'eng.codeProcedure IN(:...codes)' : 'true', {
        codes: filter?.procedures,
      })
      .andWhere(filter?.etats ? 'bon.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .andWhere(filter?.numeros ? 'bon.numero IN(:...numero)' : 'true', {
        numero: filter?.numeros,
      })
      .andWhere(
        filter?.imputation ? 'eng.imputation IN(:...numeroj)' : 'true',
        {
          numeroj: filter?.imputation,
        },
      )
      .getMany();
  }
  public async filterBon(filter?: any): Promise<BonEngagementEntity[]> {
    console.log(filter);
    const bons = this.repository
      .createQueryBuilder('bon')
      .leftJoinAndSelect('bon.numActeJuridique', 'eng')
      .leftJoinAndSelect('bon.traitements', 'traitements')
      .leftJoinAndSelect('bon.paiements', 'paiements')
      .leftJoinAndSelect('bon.facture', 'facture')
      .leftJoinAndSelect('facture.articles', 'articles')
      .getMany();
    console.log(bons);

    return;
  }
  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async deleteFactureArticle(id: number, ids?: number[]): Promise<any> {
    if (!ids) {
      return this.articleRepo.delete({ id });
    } else {
      return this.articleRepo.delete(ids);
    }
  }

  public async create(
    payload: CreateBonEngagementDTO,
    user: UserEntity,
  ): Promise<BonEngagementEntity> {
    const eng = await this.engagementRepo.findOne(payload.numActeJuridique.id);
    const count = await this.repository.count();
    const val1: string = getAbbreviation(eng.adminUnit.slice(8));
    const val2: string = ('00000' + Number(count + 1)).slice(-5);

    payload.numero = val1 + '-' + val2;
    let bonPaylaod = {
      ...(payload as any),
      createdBy: user,
      etat: EtatBonEnum.ENREGISTRE,
    };
    if (payload.facture) {
      const articles = payload.facture.articles.map((item) => {
        return {
          article: { ...item },
          quantite: item.quantite,
        };
      });

      bonPaylaod = {
        ...(payload as any),
        facture: {
          ...payload.facture,
          articles: articles,
        },
        createdBy: user,
        etat: EtatBonEnum.ENREGISTRE,
      };
    }

    const bon = await this.repository.save(bonPaylaod);

    return bon;
  }

  public async update(
    payload: CreateBonEngagementDTO,
    user: UserEntity,
    reserve = false,
  ): Promise<BonEngagementEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    let bonPaylaod = {
      ...(payload as any),
      updateBy: user,
      etat: reserve ? EtatBonEnum.RESERVE : EtatBonEnum.MODIFIE,
      montantCPReserver: reserve ? payload.montantCPChiffres : 0,
    };
    if (payload.facture) {
      const oldArticles = await this.getArticles(payload.facture.id);
      //removed articles should be removed
      const ids: number[] = [];
      if (
        oldArticles &&
        oldArticles.length !== payload.facture.articles.length
      ) {
        oldArticles.forEach((item) => {
          if (!payload.facture.articles.find((it) => it.id === item.id)) {
            ids.push(item.id);
          }
        });

        if (ids.length > 0) await this.deleteFactureArticle(0, ids);
      }
      const articles = payload.facture.articles.map((item) => {
        const artF = oldArticles.find((i) => i.id === item.id);
        return {
          id: artF ? item?.id : undefined,
          article: {
            ...item,
            id: artF ? artF.article?.id : item.id,
          },
          quantite: item.quantite,
        };
      });

      bonPaylaod = {
        ...(payload as any),
        facture: {
          ...payload.facture,
          articles: articles,
        },
        updateBy: user,
        etat: reserve ? EtatBonEnum.RESERVE : EtatBonEnum.MODIFIE,
        montantCPReserver: reserve ? payload.montantCPChiffres : 0,
      };
    }
    console.log(bonPaylaod);
    const bon = await this.repository.save(bonPaylaod);
    return bon;
  }

  public async cancelReservation(
    id: number,
    payload: any,
  ): Promise<BonEngagementEntity> {
    const property = await this.repository.findOne({
      id: id,
    });
    this.repository.save({
      ...property, // existing fields
      etat: EtatBonEnum.ANNULELORSRESERVATION, // annulation du bon
      montantCPReserver: 0,
    });
    return payload;
  }

  public async certification(
    id: number,
    payload: any,
  ): Promise<BonEngagementEntity> {
    const property = await this.repository.findOne({
      id: id,
    });
    this.repository.save({
      ...property, // existing fields
      etat: EtatBonEnum.CERTIFICAT, // annulation du bon
    });
    return payload;
  }

  /**
   * Cett méthode ajoute un traitement à la liste des traitemenst d'un bon
   * @param payload le traitement en question
   * @param user
   * @returns
   */

  public async ajouterTraitement(
    payload: CreateTraitementBonEngagementDTO,
    user: UserEntity,
  ): Promise<BonEngagementEntity> {
    const traitementPayload = {
      ...payload,
      createdBy: user,
      bon: {
        id: payload.bon.id,
      } as BonEngagementEntity,
    };

    const bon = await this.repository.findOne(payload.bon.id);
    const updatedBon = await this.repository.save({
      ...bon,
      updateBy: user,
      etat: payload.typeTraitement,
    });
    const traitement = await this.traitementBonRepository.save(
      traitementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(BonEngagementEntity, 'traitements')
      .of(updatedBon)
      .add(traitement);

    return await this.repository.findOne(payload.bon.id);
  }

  public async modifierTraitement(
    payload: CreateTraitementBonEngagementDTO,
    user: UserEntity,
  ): Promise<BonEngagementEntity> {
    const traitementPayload = {
      ...payload,
      updateBy: user,
      bon: {
        id: payload.bon.id,
      } as BonEngagementEntity,
    };

    const bon = await this.repository.findOne(payload.bon.id);
    const updatedBon = await this.repository.save({
      ...bon,
      updateBy: user,
      etat: payload.typeTraitement,
    });
    const traitement = await this.traitementBonRepository.save(
      traitementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(BonEngagementEntity, 'traitements')
      .of(updatedBon)
      .add(traitement);

    return await this.repository.findOne(payload.bon.id);
  }

  public async ajouterPaiement(
    payload: any,
    user: UserEntity,
  ): Promise<BonEngagementEntity> {
    const paiementPayload = {
      ...payload,
      createdBy: user,
      bon: {
        id: payload.bon.id,
      } as BonEngagementEntity,
    };

    const bon = await this.repository.findOne(payload.bon);
    const updatedBon = await this.repository.save({
      ...bon,
      updateBy: user,
      //etat: payload.typeTraitement,
    });
    const traitement = await this.paiementBonRepository.save(paiementPayload);
    await this.repository
      .createQueryBuilder()
      .relation(BonEngagementEntity, 'paiements')
      .of(updatedBon)
      .add(traitement);
    return await this.repository.findOne(payload.bon);
  }
}
