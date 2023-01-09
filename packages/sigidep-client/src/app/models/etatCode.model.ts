
export class EtatCodeModel{
  etat!: string;
  code!: string;
  constructor(param: Partial<EtatCodeModel>) {
    Object.assign(this, param);
  }
}
