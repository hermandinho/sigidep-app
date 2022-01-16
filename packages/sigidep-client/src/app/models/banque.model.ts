import { AgenceModel } from "./agence.model";
import { BaseModel } from "./base.model";

export class BankModel extends BaseModel {

    code!: string;
    label!: string;

    agences!: AgenceModel[];

    constructor(param: Partial<BankModel>) {
        super();
        Object.assign(this, param);
    }
}
