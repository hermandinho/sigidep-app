export class VirementMessage {
    title!: string;
    numero!: string;
    subtitle?: string

    constructor(params?: Partial<VirementMessage>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}