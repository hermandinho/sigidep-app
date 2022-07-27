import { Column, Entity, OneToMany, Unique } from "typeorm";
import { EncoursEntity } from ".";
import { BaseEntity } from "./base.entity";
import { DetailsVirementEntity } from "./details-virement.entity";
import { VirementEntity } from "./virement.entity";


@Entity({
    name: 'model_viremnt',
    orderBy: {
        id: 'DESC',
    },
})
@Unique('UQ_MODEL_VIREMENT_NOM_MODEL', ['nomModel'])
export class ModelVirementEntity extends BaseEntity {
    @Column({ name: 'nom_model', type: 'text', nullable: false })
    public nomModel: string;
    @Column({ name: 'entete_model', type: 'text', nullable: false })
    public enteteModel: string;
    @Column({ name: 'chapeau_model', type: 'text', nullable: false })
    public chapeauModel: string;
    @Column({ name: 'contenu_model', type: 'text', nullable: true })
    public contenuModel: string;

    // RELATIONS
    @OneToMany(() => VirementEntity, (object) => object.modelVirement, { eager: false })
    public detailsVirements: VirementEntity[];


}
