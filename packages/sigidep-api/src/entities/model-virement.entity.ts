import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { VirementEntity } from './virement.entity';

@Entity({
  name: 'model_viremnt',
  orderBy: {
    id: 'DESC',
  },
})
@Unique('UQ_MODEL_VIREMENT_NOM_MODEL', ['nomModel'])
export class ModelVirementEntity extends BaseEntity {
  @Column({ name: 'nom_model', type: 'text', nullable: true })
  public nomModel: string;
  @Column({ name: 'entete_model', type: 'text', nullable: true })
  public enteteModel: string;
  @Column({ name: 'chapeau_model', type: 'text', nullable: true })
  public chapeauModel: string;
  @Column({ name: 'contenu_model', type: 'text', nullable: true })
  public contenuModel: string;

  @OneToMany(() => VirementEntity, (object) => object.modelVirement, {
    eager: false,
  })
  public virement: VirementEntity[];
}
