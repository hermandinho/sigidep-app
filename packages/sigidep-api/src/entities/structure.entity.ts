import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateStructureDto } from '@modules/structure/dto/create-structure.dto';
import { SubProgramEntity } from '@entities/sub-program.entity';

@Entity({
  name: 'structures',
  orderBy: {
    code: 'ASC',
  },
})
export class StructureEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  // TODO Add to install form
  @Column({ name: 'abbreviation_fr', nullable: true })
  public abbreviationFr: string;

  // TODO Add to install form
  @Column({ name: 'abbreviation_en', nullable: true })
  public abbreviationEn: string;

  @Column({ name: 'description_fr', nullable: false, type: 'text' })
  public descriptionFr: string;

  @Column({ name: 'description_en', nullable: false, type: 'text' })
  public descriptionEn: string;

  @Column({ name: 'missions_fr', nullable: false, type: 'text' })
  public missionsFr: string;

  @Column({ name: 'missions_en', nullable: false, type: 'text' })
  public missionsEn: string;

  @Column({ name: 'address', nullable: false })
  public address: string;

  // RELATIONS
  @OneToMany(() => SubProgramEntity, (object) => object.exercise)
  subPrograms: SubProgramEntity[];

  constructor(params?: CreateStructureDto) {
    super();

    if (params) {
      Object.assign(this, params);
    }
  }
}
