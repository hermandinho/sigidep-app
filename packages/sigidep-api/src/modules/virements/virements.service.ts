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

  update(id: number, updateVirementDto: UpdateVirementDto) {
    return `This action updates a #${id} virement`;
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
    virement.etatVirement = EtatVirementEnum.RESERVED;
    this.repository.save(virement);
    return virement;
  }


  async valider(id: number) {
    let virement = await this.repository.findOne({ id });
    virement.etatVirement = EtatVirementEnum.VALIDATE;
    this.repository.save(virement);
    return virement;
  }
}
