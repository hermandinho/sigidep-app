import { DetailsVirementEntity } from '@entities/details-virement.entity';
import { EncoursEntity } from '@entities/encours.entity';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { VirementEntity, EtatVirementEnum } from '@entities/virement.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genCode } from '@utils/functions';
import { Repository } from 'typeorm';
import { CreateVirementDto } from './dto/create-virement.dto';
import { UpdateVirementDto } from './dto/update-virement.dto';
import { ValidationVirementDTO } from './dto/validation-virement.dto';

@Injectable()
export class VirementsService {
  constructor(
    @InjectRepository(VirementEntity)
    private readonly repository: Repository<VirementEntity>,
    @InjectRepository(SubProgramEntity)
    private readonly subProgram: Repository<SubProgramEntity>,
    @InjectRepository(EncoursEntity)
    private readonly encourRepository: Repository<EncoursEntity>,
    @InjectRepository(DetailsVirementEntity)
    private readonly detailsvirementRepository: Repository<DetailsVirementEntity>,
  ) { }

  async create(createVirementDto: CreateVirementDto) {
    let virement = await this.repository.save(
      new VirementEntity({
        numero: null,
        objectVirement: createVirementDto.objectVirement,
        dateVirement: createVirementDto.dateVirement,
        dateSignatureVirement: createVirementDto.dateSignatureVirement,
        signataireVirement: createVirementDto.signataireVirement,
        typeVirement: createVirementDto.typeVirement,
        spSourceVirement: createVirementDto.spSourceVirement.code + '/' + createVirementDto.spSourceVirement.labelFr,
        spCibleVirement: createVirementDto.spCibleVirement.code + '/' + createVirementDto.spCibleVirement.labelFr,
        modelVirement: createVirementDto.modelVirement,
        exercice: createVirementDto.exercice,
      })
    );
    createVirementDto.detailsVirementsCredit.forEach((e) => {
      this.detailsvirementRepository.save(
        new DetailsVirementEntity({
          codeInput: e.codeInput,
          credit: e.montant,
          debit: null,
          libelleInput: e.libelleInput,
          encour: e.encour,
          virement: virement
        })
      );
    });
    createVirementDto.detailsVirementsDebit.forEach((e) => {
      this.detailsvirementRepository.save(
        new DetailsVirementEntity({
          codeInput: e.codeInput,
          debit: e.montant,
          credit: null,
          libelleInput: e.libelleInput,
          encour: e.encour,
          virement: virement
        })
      );
    });
    virement.numero = genCode(createVirementDto.exercice.code, virement.id);
    return await this.repository.save(virement);
  }

  findAll() {
    return this.repository.find({ relations: ['modelVirement', 'detailsVirements', 'exercice'] });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['modelVirement', 'detailsVirements', 'exercice']
    });
  }

  async update(updateVirementDto: UpdateVirementDto) {
    let source = updateVirementDto.validSource ? updateVirementDto.spSourceVirement.code + '/' + updateVirementDto.spSourceVirement.labelFr : updateVirementDto.spSourceVirement;
    let cible = updateVirementDto.validCible ? updateVirementDto.spCibleVirement.code + '/' + updateVirementDto.spCibleVirement.labelFr : updateVirementDto.spCibleVirement;
    let virement = await this.repository.save(
      new VirementEntity({
        id: updateVirementDto.id,
        numero: updateVirementDto.numero,
        objectVirement: updateVirementDto.objectVirement,
        dateVirement: updateVirementDto.dateVirement,
        dateSignatureVirement: updateVirementDto.dateSignatureVirement,
        signataireVirement: updateVirementDto.signataireVirement,
        typeVirement: updateVirementDto.typeVirement,
        spSourceVirement: source as string,
        spCibleVirement: cible as string,
        modelVirement: updateVirementDto.modelVirement,
        exercice: updateVirementDto.exercice,
        etatVirement: EtatVirementEnum.UPDATED
      })
    );
    //suppression des details virements qui étaient la
    await this.detailsvirementRepository.createQueryBuilder('d').where('d.virement_id = :id', { id: virement.id }).getMany().then((res) => {
      res.forEach((e) => {
        this.detailsvirementRepository.delete(e.id);
      })
    });

    await updateVirementDto.detailsVirementsCredit.forEach((e) => {
      this.detailsvirementRepository.save(
        new DetailsVirementEntity({
          codeInput: e.codeInput,
          credit: e.montant,
          debit: null,
          libelleInput: e.libelleInput,
          encour: e.encour,
          virement: virement
        })
      );
    });
    await updateVirementDto.detailsVirementsDebit.forEach((e) => {
      this.detailsvirementRepository.save(
        new DetailsVirementEntity({
          codeInput: e.codeInput,
          debit: e.montant,
          credit: null,
          libelleInput: e.libelleInput,
          encour: e.encour,
          virement: virement
        })
      );
    });
    return virement;
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }

  getSubProgramByExercise(id: number) {
    return this.subProgram.createQueryBuilder('s').where('s.exercise_id = :id', { id: +id }).getMany();
  }

  getEncours(id: number) {
    // return this.encourRepository.find();
    return this.encourRepository.createQueryBuilder('e').where(
      'e.exercise = :id', { id: +id }
    ).leftJoinAndSelect('e.operation', 'o').getMany();
  }

  async reserver(id: number) {
    let virement = await this.repository.findOne({ id });
    if (virement.etatVirement == EtatVirementEnum.SAVED || virement.etatVirement == EtatVirementEnum.UPDATED || virement.etatVirement == EtatVirementEnum.CANCELLED) {
      virement.etatVirement = EtatVirementEnum.RESERVED;
      this.repository.save(virement);
    }
    return virement;
  }


  async valider(validationDTO: ValidationVirementDTO) {
    let virement = validationDTO.virement as VirementEntity;
    if (virement.etatVirement == EtatVirementEnum.RESERVED) {
      virement.etatVirement = EtatVirementEnum.VALIDATE;
      virement.dateSignatureVirement = validationDTO.dateSignatureVirement;
      virement.signataireVirement = validationDTO.signataireVirement;
      virement.reference = validationDTO.reference;
      await this.repository.save(virement);
    }
    return virement;
  }

  async annuler(id: number) {
    let virement = await this.repository.findOne({ id });
    if (virement.etatVirement == EtatVirementEnum.RESERVED) {
      virement.etatVirement = EtatVirementEnum.CANCELLED;
      this.repository.save(virement);
    }
    return virement;
  }
}
