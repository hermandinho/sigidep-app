import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'sub_programs',
  orderBy: {
    code: 'ASC',
    labelFr: 'ASC',
    labelEn: 'ASC',
  },
})
export class SubProgramEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'description_fr', nullable: false, type: 'text' })
  public descriptionFr: string;

  @Column({ name: 'description_en', nullable: false, type: 'text' })
  public descriptionEn: string;

  @Column({ name: 'objectives_fr', nullable: false, type: 'text' })
  public objectivesFr: string;

  @Column({ name: 'objectives_en', nullable: false, type: 'text' })
  public objectivesEn: string;

  @Column({ name: 'indicators_fr', nullable: false, type: 'text' })
  public indicatorsFr: string;

  @Column({ name: 'indicators_en', nullable: false, type: 'text' })
  public indicatorsEn: string;

  @Column({ name: 'indicators_ref_value', nullable: false })
  public indicatorsRefValue: number;

  @Column({ name: 'indicators_target_value', nullable: false })
  public indicatorsTargetValue: number;

  @Column({ name: 'indicators_ref_year', nullable: false, type: 'date' })
  public indicatorsRefYear: Date;

  @Column({ name: 'indicators_target_year', nullable: false, type: 'date' })
  public indicatorsTargetYear: Date;

  @Column({ name: 'engagement_authorization', nullable: false })
  public engagementAuthorization: number;

  @Column({
    name: 'indicators_paymentCredit_n1',
    nullable: false,
    comment:
      'Crédits de Paiement de l’indicateur du Sous-Programme à l’Exercice N+1',
  })
  public indicatorsPaymentCreditN1: number;

  @Column({
    name: 'indicators_paymentCredit_n2',
    nullable: false,
    comment:
      'Crédits de Paiement de l’indicateur du Sous-Programme à l’Exercice N+2',
  })
  public indicatorsPaymentCreditN2: number;

  @Column({
    name: 'indicators_paymentCredit_n3',
    nullable: false,
    comment:
      'Crédits de Paiement de l’indicateur du Sous-Programme à l’Exercice N+3',
  })
  public indicatorsPaymentCreditN3: number;

  @Column({ name: 'strategies_fr', nullable: false })
  public strategiesFr: string;

  @Column({ name: 'strategies_en', nullable: false })
  public strategiesEn: string;

  @Column({ name: 'verification_source_fr', nullable: false })
  public verificationSourceFr: string;

  @Column({ name: 'verification_source_en', nullable: false })
  public verificationSourceEn: string;

  @Column({ name: 'measurement_unit', nullable: false })
  public measurementUnit: string;

  @Column({ name: 'start_date', nullable: false, type: 'date' })
  public startDate: Date;

  @Column({ name: 'end_date', nullable: false, type: 'date' })
  public endDate: Date;
}
