import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { MandatEntity } from '@entities/mandat.entity';
import { CreateMandatDTO } from '../dto/create-mandat.dto';
import { EngagementFilter } from '@utils/engagement-filter';
import { EtatMandatEnum } from '@utils/etat-mandat.enum';
import { CreateTraitementMandatDTO } from '../dto/create-treatment-mandat.dto';
import { TraitementMandatEntity } from '@entities/traitement-mandat.entity';
import { PaiementEntity } from '@entities/paiement.entity';
import { FactureArticleEntity } from '@entities/facture-article.entity';

@Injectable()
export class MandatService {
  constructor(
    @InjectRepository(MandatEntity)
    private readonly repository: Repository<MandatEntity>,

    @InjectRepository(TraitementMandatEntity)
    private readonly traitementMandatRepository: Repository<TraitementMandatEntity>,

    @InjectRepository(PaiementEntity)
    private readonly paiementMandatRepository: Repository<PaiementEntity>,

    @InjectRepository(FactureArticleEntity)
    private readonly articleRepo: Repository<FactureArticleEntity>,
  ) {}

  public getRepository(): Repository<MandatEntity> {
    return this.repository;
  }

  public async getArticles(factureId: number): Promise<FactureArticleEntity[]> {
    return this.articleRepo
      .createQueryBuilder('art')
      .leftJoinAndSelect('art.facture', 'facture')
      .leftJoinAndSelect('art.article', 'article')
      .where('facture.id IN(:...codes)', {
        codes: [factureId],
      })
      .getMany();
  }

  public async filter(filter?: EngagementFilter): Promise<MandatEntity[]> {
    console.log(filter.numeros)
    return this.repository
      .createQueryBuilder('mandat')
      .leftJoinAndSelect('mandat.numActeJuridique', 'eng')
      .leftJoinAndSelect('mandat.traitements', 'traitements')
      .leftJoinAndSelect('mandat.paiements', 'paiements')
      .leftJoinAndSelect('mandat.facture', 'facture')
      .leftJoinAndSelect('facture.articles', 'articles')
      .where(filter?.procedures ? 'eng.codeProcedure IN(:...codes)' : 'true', {
        codes: filter?.procedures,
      })
      .andWhere(filter?.etats ? 'mandat.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .andWhere(filter?.numeros ? 'mandat.numero IN(:...numero)' : 'true', {
        numero: filter?.numeros,
      })
      .getMany();
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
    payload: CreateMandatDTO,
    user: UserEntity,
  ): Promise<MandatEntity> {
    let mandatPaylaod = {
      ...(payload as any),
      createdBy: user,
      etat: EtatMandatEnum.MANDATENREGISTRE, //-Mandat enregistré ref-table Traitement
    };
    if (payload.facture) {
      const articles = payload.facture.articles.map((item) => {
        return {
          article: { ...item },
          quantite: item.quantite,
        };
      });

      mandatPaylaod = {
        ...(payload as any),
        facture: {
          ...payload.facture,
          articles: articles,
        },
        createdBy: user,
        etat: EtatMandatEnum.MANDATENREGISTRE, //-Mandat enregistré ref-table Traitement
      };
    }

    const mandat = await this.repository.save(mandatPaylaod);

    const traitementPayload: CreateTraitementMandatDTO = {
      mandat: mandat.id,
      typeTraitement: EtatMandatEnum.MANDATENREGISTRE,
      observation: '',
      qteUnitePhysiqueReal: null,
      montantTotalUnitPhysReal: null,
    };
    this.ajouterTraitement(traitementPayload, user);
    this.ajouterPaiement(traitementPayload, user);
    return mandat;
  }

  public async update(
    payload: CreateMandatDTO,
    user: UserEntity,
    reserve: boolean = false,
  ): Promise<MandatEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    let mandatPaylaod = {
      ...(payload as any),
      updateBy: user,
      etat: reserve
        ? EtatMandatEnum.MANDATRESERVE
        : EtatMandatEnum.MANDATMODIFIE,
    };
    if (payload.facture) {
      const oldArticles = await this.getArticles(payload.facture.id);
      //removed articles should be removed
      let ids: number[] = [];
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

      mandatPaylaod = {
        ...(payload as any),
        facture: {
          ...payload.facture,
          articles: articles,
        },
        updateBy: user,
        etat: reserve
          ? EtatMandatEnum.MANDATRESERVE
          : EtatMandatEnum.MANDATMODIFIE,
      };
    }
    const mandat = await this.repository.save(mandatPaylaod);

    const traitementPayload: CreateTraitementMandatDTO = {
      mandat: mandat.id,
      typeTraitement: EtatMandatEnum.MANDATENREGISTRE,
      observation: '',
      qteUnitePhysiqueReal: null,
      montantTotalUnitPhysReal: null,
    };
    this.modifierTraitement(traitementPayload, user);
    return mandat;
  }

  public async cancelReservation(id: number): Promise<MandatEntity> {
    const property = await this.repository.findOne({
      id: id,
    });

    return this.repository.save({
      ...property, // existing fields
      etat: EtatMandatEnum.ANNULATIONMANDAT, // annulation du mandat
    });
  }

  /**
   * Cett méthode ajoute un traitement à la liste des traitemenst d'un mandat
   * @param payload le traitement en question
   * @param user
   * @returns
   */

  public async ajouterTraitement(
    payload: CreateTraitementMandatDTO,
    user: UserEntity,
  ): Promise<MandatEntity> {
    const traitementPayload = {
      ...payload,
      createdBy: user,
      mandat: {
        id: payload.mandat.id,
      } as MandatEntity,
    };

    const mandat = await this.repository.findOne(payload.mandat.id);
    const updatedMandat = await this.repository.save({
      ...mandat,
      updateBy: user,
      etat: payload.typeTraitement,
    });
    const traitement = await this.traitementMandatRepository.save(
      traitementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(MandatEntity, 'traitements')
      .of(updatedMandat)
      .add(traitement);

    return await this.repository.findOne(payload.mandat.id);
  }

  public async modifierTraitement(
    payload: CreateTraitementMandatDTO,
    user: UserEntity,
  ): Promise<MandatEntity> {
    const traitementPayload = {
      ...payload,
      updateBy: user,
      mandat: {
        id: payload.mandat.id,
      } as MandatEntity,
    };

    const mandat = await this.repository.findOne(payload.mandat.id);
    const updatedMandat = await this.repository.save({
      ...mandat,
      updateBy: user,
      etat: payload.typeTraitement,
    });
    const traitement = await this.traitementMandatRepository.save(
      traitementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(MandatEntity, 'traitements')
      .of(updatedMandat)
      .add(traitement);

    return await this.repository.findOne(payload.mandat.id);
  }

  public async ajouterPaiement(
    payload: any,
    user: UserEntity,
  ): Promise<MandatEntity> {
    const paiementPayload = {
      ...payload,
      createdBy: user,
      mandat: {
        id: payload.mandat.id,
      } as MandatEntity,
    };

    const mandat = await this.repository.findOne(payload.mandat);
    const updatedMandat = await this.repository.save({
      ...mandat,
      updateBy: user,
      //etat: payload.typeTraitement,
    });
    const traitement = await this.paiementMandatRepository.save(
      paiementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(MandatEntity, 'paiements')
      .of(updatedMandat)
      .add(traitement);

    return await this.repository.findOne(payload.mandat);
  }
}
