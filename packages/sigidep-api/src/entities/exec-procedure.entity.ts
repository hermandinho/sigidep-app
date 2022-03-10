import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity, TypeProcedureEntity } from '.';
@Entity({
  name: 'execprocedure',
  orderBy: {
    id: 'ASC',
  },
})
export class ExecProcedureEntity extends BaseEntity {
  @ManyToOne(() => TypeProcedureEntity, (object) => object.code, {
    eager: true,
    nullable: false,
    cascade: false,
  })
  typeProcedure: TypeProcedureEntity;

  @Column({ nullable: false })
  matriculeAgent: string;

  @Column({ nullable: false })
  nomAgent: string;

  @Column({ nullable: false })
  numContribuable: string;

  @Column({ nullable: false })
  nomContribuable: string;

  @Column({ type: 'float', nullable: true })
  TxTVA: number;

  @Column({ type: 'float', nullable: true })
  TxIR: number;

  @Column({ nullable: false })
  RIB: string;
}
