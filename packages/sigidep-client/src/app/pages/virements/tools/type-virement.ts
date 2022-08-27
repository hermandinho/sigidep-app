export const typeVirement = [
    {
        code: '1-BF à BF',
        id: 1
    },
    {
        code: '2-BIP à BIP',
        id: 2
    },
    {
        code: '3-BF à BIP',
        id: 3
    },
    {
        code: '4-BIP à BF',
        id: 4
    }
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