import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { DetailsVirementEntity } from "./details-virement.entity";
import { ExerciseEntity } from "./exercise.entity";
import { ModelVirementEntity } from "./model-virement.entity";
export enum VirementEtatEnum {
    SAVED = 'Enregistrer', // Used when creating an Exercise automatically
    UPDATED = 'Modifier',
    RESERVED = 'Reserver',
    CANCELLED = 'Annuler',
    VALIDATE = 'Validé',
}
export enum TypeVirementEnum {
    BFToBF = '1-BF à BF', // Used when creating an Exercise automatically
    BIPToBIP = '2-BIP à BIP',
    BIPToBF = '3-BF à BIP',
    BFToBIP = '4-BIP à BF',
}

@Entity({
    name: 'virement',
    orderBy: {
        id: 'DESC',
    },
})
export class VirementEntity extends BaseEntity {
    @Column({ name: 'numero', nullable: true, type: String })
    public numero: string;
    @Column({ name: 'object_virement', nullable: false, type: String })
    public objectVirement: string;
    @Column({ name: 'date_virement', nullable: false, type: String })
    public dateVirement: string;
    @Column({ name: 'date_signature_virement', nullable: true, type: Date })
    public dateSignatureVirement: Date;
    @Column({ name: 'signataire_virement', nullable: true, type: String })
    public signataireVirement: string;
    @Column({ name: 'type_virement', nullable: false, type: 'enum', enum: TypeVirementEnum })
    public typeVirement: TypeVirementEnum;
    @Column({ name: 'sp_source_virement', nullable: false, type: String })
    public spSourceVirement: string;
    @Column({ name: 'sp_cible_virement', nullable: false, type: String })
    public spCibleVirement: string;
    @Column({ name: 'etat_virement', nullable: false, type: 'enum', enum: VirementEtatEnum, default: VirementEtatEnum.SAVED })
    public etatVirement: VirementEtatEnum;

    // RELATIONS
    @OneToMany(() => DetailsVirementEntity, (object) => object.virement, { eager: false })
    public detailsVirements: DetailsVirementEntity[];


    @ManyToOne(() => ModelVirementEntity, (object) => object.id, { eager: false })
    @JoinColumn({ name: 'model_virement_id', referencedColumnName: 'id' })
    public modelVirement: ModelVirementEntity;

    @ManyToOne(() => ExerciseEntity, (object) => object.id, { eager: false })
    @JoinColumn({ name: 'exercice_id', referencedColumnName: 'id' })
    public exercice: ExerciseEntity;

    constructor(
        params?: Partial<VirementEntity>,
    ) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
