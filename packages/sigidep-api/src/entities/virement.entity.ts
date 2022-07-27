import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { DetailsVirementEntity } from "./details-virement.entity";
import { ModelVirementEntity } from "./model-virement.entity";
export enum VirementEtatEnum {
    SAVED = 'Enregistrer', // Used when creating an Exercise automatically
    UPDATED = 'Modifier',
    RESERVED = 'Reserver',
    CANCELLED = 'Annuler',
}

@Entity({
    name: 'virement',
    orderBy: {
        id: 'DESC',
    },
})
export class VirementEntity extends BaseEntity {
    @Column({ name: 'numero', nullable: false, type: 'int' })
    public numero: number;
    @Column({ name: 'object_virement', nullable: false, type: String })
    public objectVirement: string;
    @Column({ name: 'date_virement', nullable: false, type: String })
    public dateVirement: string;
    @Column({ name: 'date_signature_virement', nullable: false, type: Date })
    public dateSignatureVirement: Date;
    @Column({ name: 'signataire_virement', nullable: false, type: String })
    public signataireVirement: string;
    @Column({ name: 'type_virement', nullable: false, type: String })
    public typeVirement: string;
    @Column({ name: 'sp_source_virement', nullable: false, type: String })
    public spSourceVirement: string;
    @Column({ name: 'sp_cible_virement', nullable: false, type: 'enum', enum: VirementEtatEnum })
    public spCibleVirement: string;
    @Column({ name: 'etat_virement', nullable: false, type: 'enum', enum: VirementEtatEnum })
    public etatVirement: VirementEtatEnum;

    // RELATIONS
    @OneToMany(() => DetailsVirementEntity, (object) => object.virement, { eager: false })
    public detailsVirements: DetailsVirementEntity[];


    @ManyToOne(() => ModelVirementEntity, (object) => object.id, {
        eager: false,
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'model_virement_id', referencedColumnName: 'id' })
    public modelVirement: ModelVirementEntity;
}
