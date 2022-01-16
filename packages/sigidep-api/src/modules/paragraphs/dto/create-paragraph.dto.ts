import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParagraphDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  public code: string;

  @ApiProperty({ example: 'Budget de fonctionnement', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Operating budget', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'BF', required: true })
  @IsNotEmpty()
  public abbreviationFr: string;

  @ApiProperty({ example: 'OB', required: true })
  @IsNotEmpty()
  public abbreviationEn: string;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public financialSourceId: number;
}

/*
{
  "Sheet1": [
  {
    "code": "201100",
    "labelFr": "Frais de recherche pour investissement dans le secteur agricole, animal, sylvicole et faunique",
    "abbreviationFr": "FRAIS RECH INVEST SECT AGRI",
    "labelEn": "Research costs for investment in the agricultural, animal, forestry and wildlife sector",
    "abbreviationEn": "RES COSTS INVEST AGRI, FOREST & WILDLIF",
    "financialSourceId": 2
  },
  {
    "code": "220110",
    "labelFr": "Construction Immeubles abritant les services sièges et les Délégations Régionales",
    "abbreviationFr": "IMM ABRIT IMM SERV SIEG ET DR",
    "labelEn": "Construction of Buildings housing headquarters services and Regional Delegations",
    "abbreviationEn": "CONSTRUCT BUILDX HEADQTR & RD SRVCES",
    "financialSourceId": 2
  },
  {
    "code": "221010",
    "labelFr": "Aménagement des immeubles",
    "abbreviationFr": "AMENGT IMMBLES",
    "labelEn": "Development of buildings",
    "abbreviationEn": "DEV BUILDX",
    "financialSourceId": 2
  },
  {
    "code": "222010",
    "labelFr": "Matériel de transport",
    "abbreviationFr": "MAT TRANSP",
    "labelEn": "Transportation equipment",
    "abbreviationEn": "TRANSPORT EQUIP",
    "financialSourceId": 2
  },
  {
    "code": "222110",
    "labelFr": "Matériels, mobiliers et équipement de bureau",
    "abbreviationFr": "MAT, MOB & EQUIP BUR",
    "labelEn": "Office materials, furniture and equipment",
    "abbreviationEn": "OFFICE MAT, FURN & EQUIP",
    "financialSourceId": 2
  },
  {
    "code": "222210",
    "labelFr": "Matériels et équipements techniques et engagements transitoires",
    "abbreviationFr": "MAT, EQUIP TECH & ENGAG TRANSIT",
    "labelEn": "Technical materials and equipment and transitional commitments",
    "abbreviationEn": "TECH MAT & EQUIP & TRANSIT COMMTMTS",
    "financialSourceId": 2
  },
  {
    "code": "222310",
    "labelFr": "Matériels informatiques, réseaux et logiciels",
    "abbreviationFr": "MAT INFO, RSX & LOGIC",
    "labelEn": "Computer hardware, networks and software",
    "abbreviationEn": "COMP HARD, NETW & SOFT",
    "financialSourceId": 2
  },
  {
    "code": "222810",
    "labelFr": "Matériels audiovisuels",
    "abbreviationFr": "MAT AUDIOVIS",
    "labelEn": "Audiovisual materials",
    "abbreviationEn": "AV MATERIALS",
    "financialSourceId": 2
  },
  {
    "code": "222820",
    "labelFr": "Matériels de sécurité des locaux",
    "abbreviationFr": "MAT SECUR LOCAUX",
    "labelEn": "Premises security equipment",
    "abbreviationEn": "PREMISES SECTY EQUIP",
    "financialSourceId": 2
  },
  {
    "code": "610002",
    "labelFr": "Frais de téléphone mobile",
    "abbreviationFr": "FRAIS TEL MOB",
    "labelEn": "Mobile phone charges",
    "abbreviationEn": "MOBILEPHONE CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "610010",
    "labelFr": "Fourniture de bureau",
    "abbreviationFr": "FOURN BUR",
    "labelEn": "Office supply",
    "abbreviationEn": "OFFICE SUPPLY",
    "financialSourceId": 1
  },
  {
    "code": "610015",
    "labelFr": "Consommables informatiques, électriques",
    "abbreviationFr": "CONSOMBLES INFO, ELEC",
    "labelEn": "Computer, electrical consumables",
    "abbreviationEn": "COMP, ELECTCAL CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "610030",
    "labelFr": "Impression des documents budgétaires, comptables et autres",
    "abbreviationFr": "IMP DOCS BUD, COMPTA & AUTRES",
    "labelEn": "Printing of budget, accounting and other documents",
    "abbreviationEn": "PRINTX OF BUDGET, ACCTX &  OTHER DOCS",
    "financialSourceId": 1
  },
  {
    "code": "610040",
    "labelFr": "Documentation, bulletins d'informations et abonnements divers",
    "abbreviationFr": "DOCMTION, BUL D'INFO & ABO DIV",
    "labelEn": "Documentation, newsletters and various subscriptions",
    "abbreviationEn": "DOCTION, NEWSLETTERS & VAR SUBSCRPT",
    "financialSourceId": 1
  },
  {
    "code": "610105",
    "labelFr": "Produit de nettoyage",
    "abbreviationFr": "PDTS NETTOYAGE",
    "labelEn": "Cleaning product",
    "abbreviationEn": "CLEANX PDCTS",
    "financialSourceId": 1
  },
  {
    "code": "610110",
    "labelFr": "Petit outillage/matériels de nettoyage",
    "abbreviationFr": "PTIT OUTIL/MAT NETTOYAGE",
    "labelEn": "Small tools / cleaning materials",
    "abbreviationEn": "SMALL TOOLS/CLEANX MAT",
    "financialSourceId": 1
  },
  {
    "code": "610200",
    "labelFr": "Electricité",
    "abbreviationFr": "ELECTRICITE",
    "labelEn": "electricity",
    "abbreviationEn": "ELECTRICITY",
    "financialSourceId": 1
  },
  {
    "code": "610210",
    "labelFr": "Eau",
    "abbreviationFr": "EAU",
    "labelEn": "Water",
    "abbreviationEn": "WATER",
    "financialSourceId": 1
  },
  {
    "code": "610220",
    "labelFr": "Carburant et lubrifiant",
    "abbreviationFr": "CARB & LUB",
    "labelEn": "Fuel and lubricant",
    "abbreviationEn": "FUEL & LUB",
    "financialSourceId": 1
  },
  {
    "code": "610300",
    "labelFr": "Produits pharmaceutiques consommés",
    "abbreviationFr": "PDTS PHARMA CONSO",
    "labelEn": "Pharmaceuticals consumed",
    "abbreviationEn": "PHARMAC CONSUMED",
    "financialSourceId": 1
  },
  {
    "code": "611010",
    "labelFr": "Transport de l'ordonnateur et des membres du Conseil d'Administration",
    "abbreviationFr": "TRANSP ORDO & MBRES CA",
    "labelEn": "Transport of the authorizing officer and members of the Board of Directors",
    "abbreviationEn": "TRANSP AUTH OFFFICER & MBERS BOARD DIR",
    "financialSourceId": 1
  },
  {
    "code": "611100",
    "labelFr": "Transport du personnel",
    "abbreviationFr": "TRANSP PERSO",
    "labelEn": "Personal transport",
    "abbreviationEn": "PERS TRANSPORT",
    "financialSourceId": 1
  },
  {
    "code": "612000",
    "labelFr": "Frais de services de colis postaux",
    "abbreviationFr": "FRAIS SRVCES COLIS POST",
    "labelEn": "Parcel post service charges",
    "abbreviationEn": "PARCEL POST CHRGES",
    "financialSourceId": 1
  },
  {
    "code": "612001",
    "labelFr": "Frais de téléphone fixe",
    "abbreviationFr": "FRAIS TEL FIXE",
    "labelEn": "Fixed telephone charges",
    "abbreviationEn": "FIXED TEL CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "612002",
    "labelFr": "Frais de téléphone mobile",
    "abbreviationFr": "FRAIS TEL MOBILE",
    "labelEn": "Mobile phone charges",
    "abbreviationEn": "MOBILE PHONE CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "612003",
    "labelFr": "Redevances des services Internet et TV",
    "abbreviationFr": "REDV SERVCES INTERNET & TV",
    "labelEn": "Internet and TV service charges",
    "abbreviationEn": "INTERNET & TV SERVICE CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "612004",
    "labelFr": "Frais d'abonnement à la presse",
    "abbreviationFr": "FRAIS ABO PRESSE",
    "labelEn": "Press subscription fees",
    "abbreviationEn": "PRESS SUBSC FEES",
    "financialSourceId": 1
  },
  {
    "code": "612020",
    "labelFr": "Frais de mission à l'intérieur",
    "abbreviationFr": "FRAIS MISSION INT",
    "labelEn": "Mission expenses inside",
    "abbreviationEn": "MISSION EXPENSES INSIDE",
    "financialSourceId": 1
  },
  {
    "code": "612021",
    "labelFr": "Frais de mission à l'extérieur",
    "abbreviationFr": "FRAIS MISSION EXT",
    "labelEn": "Mission expenses abroad",
    "abbreviationEn": "MISSION EXPENSES ABROAD",
    "financialSourceId": 1
  },
  {
    "code": "612022",
    "labelFr": "Frais complémentaires de mission",
    "abbreviationFr": "FRAIS COMPL MISSION",
    "labelEn": "Additional mission expenses",
    "abbreviationEn": "ADD MISSION EXPENSES",
    "financialSourceId": 1
  },
  {
    "code": "612030",
    "labelFr": "Frais location des machines, matériels et autres",
    "abbreviationFr": "FRAIS LOCAT MACH, MAT & AUTRES",
    "labelEn": "Rental costs of machinery, equipment and others",
    "abbreviationEn": "RENTAL COSTS MACHINRY, EQUIP & OTHERS",
    "financialSourceId": 1
  },
  {
    "code": "612040",
    "labelFr": "Loyers et charges locatives",
    "abbreviationFr": "LOYERS & CHAR LOCATIVES",
    "labelEn": "Rents and rental charges",
    "abbreviationEn": "RENTS & RENTAL CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "612050",
    "labelFr": "Honoraires",
    "abbreviationFr": "HONORAIRES",
    "labelEn": "Fees",
    "abbreviationEn": "FEES",
    "financialSourceId": 1
  },
  {
    "code": "612060",
    "labelFr": "Frais de gardiennage",
    "abbreviationFr": "FRAIS GARDIENGE",
    "labelEn": "Watchguard fees",
    "abbreviationEn": "WATCHGUARD FEES",
    "financialSourceId": 1
  },
  {
    "code": "612070",
    "labelFr": "Frais de représentation et de réception",
    "abbreviationFr": "FRAIS REPRES & RECEPT",
    "labelEn": "Representation and reception expenses",
    "abbreviationEn": "REPRESNT & RECEPTION EXPENSES",
    "financialSourceId": 1
  },
  {
    "code": "612080",
    "labelFr": "Annonces, gadgets et publicités",
    "abbreviationFr": "ANNONCES & GADGT PUBS",
    "labelEn": "Ads, gadgets and advertisements",
    "abbreviationEn": "ADS, GADGETS & ADVERTISEMENT",
    "financialSourceId": 1
  },
  {
    "code": "612090",
    "labelFr": "Fêtes et cérémonies",
    "abbreviationFr": "FETES & CEREMONIES",
    "labelEn": "Parties and ceremonies",
    "abbreviationEn": "PARTIES & CEREMONIES",
    "financialSourceId": 1
  },
  {
    "code": "612110",
    "labelFr": "Frais pour entretien des résidences",
    "abbreviationFr": "FRAIS ENTRETIEN RÉSI",
    "labelEn": "Residential maintenance fees",
    "abbreviationEn": "RESID MAINTENANCE FEES",
    "financialSourceId": 1
  },
  {
    "code": "612120",
    "labelFr": "Frais pour entretien des constructions",
    "abbreviationFr": "FRAIS ENTRETIEN CONSTRUCT",
    "labelEn": "Costs for building maintenance",
    "abbreviationEn": "COSTS & BUILDX MAINT",
    "financialSourceId": 1
  },
  {
    "code": "612130",
    "labelFr": "Entretien et réparation des matériels de transport",
    "abbreviationFr": "ENTRET & REPARAT MAT TRANSP",
    "labelEn": "Maintenance and repair of transport equipment",
    "abbreviationEn": "MAINT & REPAIR OF TRANSP EQUIP",
    "financialSourceId": 1
  },
  {
    "code": "612140",
    "labelFr": "Entretien et réparation des matériels des matériels techniques",
    "abbreviationFr": "ENT & REP MAT TECH",
    "labelEn": "Equipment maintenance and repair of technical equipment",
    "abbreviationEn": "EQUIP MAINT & REPAIR OF TECH EQUIP",
    "financialSourceId": 1
  },
  {
    "code": "612145",
    "labelFr": "Entretien des autres matériels et mobiliers",
    "abbreviationFr": "ENT AUTRES MAT& MOB",
    "labelEn": "Maintenance of other equipment and furniture",
    "abbreviationEn": "MAINT OF OTHER EQUIP & FURN",
    "financialSourceId": 1
  },
  {
    "code": "620010",
    "labelFr": "Rémunération brute du personnel",
    "abbreviationFr": "REMUN BRUT PERS",
    "labelEn": "Gross remuneration for the Staff",
    "abbreviationEn": "GROSS REMUN STAFF",
    "financialSourceId": 1
  },
  {
    "code": "620011",
    "labelFr": "Rémunération brute fonctionnaires détachés",
    "abbreviationFr": "REM BRUT FONCT DETACH",
    "labelEn": "Gross remuneration for seconded officials",
    "abbreviationEn": "GROSS REMUN SECONDED OFFICIALS",
    "financialSourceId": 1
  },
  {
    "code": "620012",
    "labelFr": "Complément sur salaire du personnel fonctionnaire",
    "abbreviationFr": "COMPL SAL PERS FONCT",
    "labelEn": "Salary supplement for civil servants",
    "abbreviationEn": "SAL SUPLMNT FOR CIVIL SERV",
    "financialSourceId": 1
  },
  {
    "code": "620110",
    "labelFr": "Primes et remises diverses",
    "abbreviationFr": "PRIM REM DIVSES",
    "labelEn": "Bonuses and various discounts",
    "abbreviationEn": "PREMIUMS & VARIOUS DISCOUNTS",
    "financialSourceId": 1
  },
  {
    "code": "620600",
    "labelFr": "Frais de formation et stages",
    "abbreviationFr": "FRAIS FORM & STAGE",
    "labelEn": "Training and internship costs",
    "abbreviationEn": "TRAINX & INTERNS COSTS",
    "financialSourceId": 1
  },
  {
    "code": "620700",
    "labelFr": "Personnel extérieur (stagiaires, temporaires, etc.)",
    "abbreviationFr": "PERS EXT",
    "labelEn": "External staff (interns, temporary workers, etc.)",
    "abbreviationEn": "EXT STAFF(INTERS, TEMP WORKERS)",
    "financialSourceId": 1
  },
  {
    "code": "620900",
    "labelFr": "Primes d'assurance couverture sanitaire",
    "abbreviationFr": "PRIME ASS COUV SAN",
    "labelEn": "Health insurance premiums",
    "abbreviationEn": "HEALTH INSUR PREMIUMS",
    "financialSourceId": 1
  },
  {
    "code": "620910",
    "labelFr": "Médecine de travail",
    "abbreviationFr": "MEDEC DE TRAV",
    "labelEn": "Work Medecine",
    "abbreviationEn": "WORK MEDCINE",
    "financialSourceId": 1
  },
  {
    "code": "620930",
    "labelFr": "Autres frais de personnel",
    "abbreviationFr": "AUTRES FRAIS PERS",
    "labelEn": "Other personnel costs",
    "abbreviationEn": "OTHER PERSON COSTS",
    "financialSourceId": 1
  },
  {
    "code": "630010",
    "labelFr": "Vignettes et cartes grises automobiles",
    "abbreviationFr": "VIGN & CART GRSES AUTO",
    "labelEn": "Vehicle stickers and registration cards",
    "abbreviationEn": "VEHICLE STICKERS & REG CARDS",
    "financialSourceId": 1
  },
  {
    "code": "630500",
    "labelFr": "Impôts et taxes diverses",
    "abbreviationFr": "IMP & TAXES DIVSES",
    "labelEn": "Taxes and various taxes",
    "abbreviationEn": "TAXES AND VARIOUS TAXES",
    "financialSourceId": 1
  },
  {
    "code": "640500",
    "labelFr": "Frais de gestion bancaires",
    "abbreviationFr": "FRAIS GEST BANC",
    "labelEn": "Bank management fees",
    "abbreviationEn": "BANK MANAGEMT FEES",
    "financialSourceId": 1
  },
  {
    "code": "650020",
    "labelFr": "Contribution aux charges des organismes nationaux et internationaux",
    "abbreviationFr": "CONTRIB CHARG ORG NAT & INT",
    "labelEn": "Contribution to the costs of national and international organizations",
    "abbreviationEn": "CONTRIB TO COSTS NAT & INTERNAT ORGS",
    "financialSourceId": 1
  },
  {
    "code": "650030",
    "labelFr": "Autres charges des organismes nationaux et internationaux",
    "abbreviationFr": "AUT CHARGES ORG NAT & INT",
    "labelEn": "Other expenses of national and international organizations",
    "abbreviationEn": "OTHER EXPENSES OF NAT & INTERNAT ORG",
    "financialSourceId": 1
  },
  {
    "code": "670101",
    "labelFr": "Frais d'organisation des activités sportives et culturelles",
    "abbreviationFr": "FRAIS ORG ACT SPORT & CULT",
    "labelEn": "Costs of organizing sports and cultural activities",
    "abbreviationEn": "COSTS ORGANISX SPORTS & CULT ACT",
    "financialSourceId": 1
  },
  {
    "code": "670110",
    "labelFr": "Indemnités des membres et invités du Conseil d'Administration",
    "abbreviationFr": "INDEM MBRES & INVITES CA",
    "labelEn": "Compensation for members and guests of the Board of Directors",
    "abbreviationEn": "COMPENS FOR MBERS & GUEST ",
    "financialSourceId": 1
  },
  {
    "code": "670111",
    "labelFr": "Emoluments du bureau exécutif",
    "abbreviationFr": "EMOLMNT BUR EXEC",
    "labelEn": "Executive office fees",
    "abbreviationEn": "EXEC OFFICERS FEES",
    "financialSourceId": 1
  },
  {
    "code": "670112",
    "labelFr": "Frais d'organisation des Conseil d'Administration",
    "abbreviationFr": "FRAIS ORG CA",
    "labelEn": "Organization costs of the Board of Directors",
    "abbreviationEn": "ORGANISAT COSTS OF THE BOARD OF DIR",
    "financialSourceId": 1
  },
  {
    "code": "670115",
    "labelFr": "Emoluments  des Délégué Régionaux",
    "abbreviationFr": "EMOLMNT BUR DEL REG",
    "labelEn": "Emoluments of the Regional Delegates",
    "abbreviationEn": "EMOLMNTS OF REG DELEGATES",
    "financialSourceId": 1
  },
  {
    "code": "670116",
    "labelFr": "Indemnité de suggestion du Président",
    "abbreviationFr": "INDEM SUGG PRESI",
    "labelEn": "President's suggestion allowance",
    "abbreviationEn": "PSDT'S SUGGEST ALLOWANCE",
    "financialSourceId": 1
  },
  {
    "code": "670117",
    "labelFr": "Indemnité de logement de l'Agent comptable",
    "abbreviationFr": "INDEM LOG AC",
    "labelEn": "Housing allowance of the Accounting Officer",
    "abbreviationEn": "HOUSX ALLOW OF ACC OFFICER",
    "financialSourceId": 1
  },
  {
    "code": "670300",
    "labelFr": "Droit de Régulation des marchés publics",
    "abbreviationFr": "DROIT RÉGULAT MARCH PUB",
    "labelEn": "Public procurement regulation law",
    "abbreviationEn": "PUBLIC PROCURMNT REGULATION LAW",
    "financialSourceId": 1
  },
  {
    "code": "670320",
    "labelFr": "Frais de fonctionnement des commissions, comités et Secrétariat Technique",
    "abbreviationFr": "FRAIS FONCT COM COMTES & ST",
    "labelEn": "Operating costs of commissions, committees and Technical Secretariat",
    "abbreviationEn": "OERATX COSTS OF COMMI, COMIT & TECH SEC",
    "financialSourceId": 1
  },
  {
    "code": "670410",
    "labelFr": "Assurance véhicules et équipements technique",
    "abbreviationFr": "ASSUR VHCLES & EQUPMNT TECH",
    "labelEn": "Vehicle and technical equipment insurance",
    "abbreviationEn": "VEHICLE & TECH EQUIP INSURANCE",
    "financialSourceId": 1
  },
  {
    "code": "670420",
    "labelFr": "Assurance et entretien des bâtiments",
    "abbreviationFr": "ASSUR & ENT BÂTI",
    "labelEn": "Insurance and building maintenance",
    "abbreviationEn": "INSURANCE & BUILDX MAINT",
    "financialSourceId": 1
  },
  {
    "code": "670510",
    "labelFr": "Frais d'organisation des séminaires et conférences",
    "abbreviationFr": "FRAIS ORG SEMIN & CONF",
    "labelEn": "Organization costs of seminars and conferences",
    "abbreviationEn": "ORGANISAT COSTS OF SEMINARS & CONFER",
    "financialSourceId": 1
  },
  {
    "code": "670610",
    "labelFr": "Dons et cadeaux",
    "abbreviationFr": "DONS & CADEAUX",
    "labelEn": "Donations and gifts",
    "abbreviationEn": "DONATION & GIFTS",
    "financialSourceId": 1
  },
  {
    "code": "670630",
    "labelFr": "Charges diverses et engagements transitoires",
    "abbreviationFr": "CHARG DIVSES & ENGAG TRANS",
    "labelEn": "Various charges and transitional commitments",
    "abbreviationEn": "VARIOUS CHARGES",
    "financialSourceId": 1
  },
  {
    "code": "670640",
    "labelFr": "Frais d'indemnisation",
    "abbreviationFr": "FRAIS INDEMNIS",
    "labelEn": "Compensation costs",
    "abbreviationEn": "COMPENSATION COSTS",
    "financialSourceId": 1
  },
  {
    "code": "671510",
    "labelFr": "Frais judiciaires payés",
    "abbreviationFr": "FRAIS JUDIC PAYÉ",
    "labelEn": "Court fees paid",
    "abbreviationEn": "COURT FEES P PAID",
    "financialSourceId": 1
  }
]
}*/
