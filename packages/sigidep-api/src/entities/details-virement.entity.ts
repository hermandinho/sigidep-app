import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { EncoursEntity } from "./encours.entity";
import { VirementEntity } from "./virement.entity";

@Entity({
    name: 'details_virement',
})
export class DetailsVirementEntity extends BaseEntity {
    @Column({ name: 'code_input', type: String })
    public codeInput: string;
    @Column({ name: 'libelle_input', type: 'text' })
    public libelleInput: string;
    @Column({ type: 'float', name: 'debit', nullable: true })
    public debit: number;
    @Column({ type: 'float', name: 'credit', nullable: true })
    public credit: number;

    @ManyToOne(() => VirementEntity, (object) => object.id, {
        eager: false,
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'virement_id', referencedColumnName: 'id' })
    public virement: VirementEntity;

    @ManyToOne(() => EncoursEntity, (object) => object.id, {
        eager: false,
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'encour_id', referencedColumnName: 'id' })
    public encour: EncoursEntity;

    constructor(param?: Partial<DetailsVirementEntity>) {
        super();
        if (param) {
            Object.assign(this, param);
        }
    }
}