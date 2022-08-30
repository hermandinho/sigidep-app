export const typeVirement = [
    '1-BF à BF',
    '2-BIP à BIP',
    '3-BF à BIP',
    '4-BIP à BF'
]

export enum typeFinancementEnum {
    BF01 = "01 - BF",
    BIP02 = "02 - BIP"
}

export enum typeVirementEnum {
    BF2BF = "1-BF à BF",
    BIP2BIP = "2-BIP à BIP",
    BF2BIP = "3-BF à BIP",
    BIP2BF = "4-BIP à BF",
}

export enum ModeVirementEnum {
    CREATION, RESERVATION, VALIDATION, CANCELLED
}

export enum EtatVirementEnum {
    SAVED = 'Enregistrer', // Used when creating an Exercise automatically
    UPDATED = 'Modifier',
    RESERVED = 'Reserver',
    CANCELLED = 'Annuler',
    VALIDATE = 'Validé',
}