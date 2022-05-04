import { ApiProperty } from '@nestjs/swagger';

export class CreateEngagementMandatDTO {
  id?: number;
  
  @ApiProperty({ required: false })
  public MatriculeGestionnaireMandat: string;

  @ApiProperty({ required: false })
  public ObjetMandat: string;

  @ApiProperty({ required: false })
  public DateEngagementMandat: string;

  @ApiProperty({ required: false })
  public MontantCPChiffresMandat: Date;

  @ApiProperty({ required: false })
  public MontantCPLettresMandat: string;

  @ApiProperty({ required: false })
  public DateLiquidationMandat: string;

  @ApiProperty({ required: false })
  public DateOrdonnancementMandat: string;
  @ApiProperty({ required: false })
  public ModePaiementMandat: string;

  @ApiProperty({ required: false })
  public CompteADebiterMandat: string;

  @ApiProperty({ required: false })
  public CompteACrediterMandat: string;

  @ApiProperty({ required: false })
  public DatePaiementMandat: string;

  @ApiProperty({ required: false })
  public VillePaiementMandat: string;

  @ApiProperty({ required: false })
  public EtatMandat: string;

  @ApiProperty({ example: 'CARNET0001', required: false })
  public NumeroMandat: string;

  @ApiProperty({ required: true })
  public RejetMandat: number;

  @ApiProperty({ required: true })
  public EncoursMandat: number;
  
  @ApiProperty({ required: true })
  public operationId: number;

  @ApiProperty({ required: true })
  public OrdonnanceMandat: number;

  @ApiProperty({ required: true })
  public PayeMandat: number;

  @ApiProperty({ required: true })
  public NumActeJuridiqueMandat: number;
}
