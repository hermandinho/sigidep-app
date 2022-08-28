export class VirementMessage {
    title!: string;
    numero!: string;
    subtitle?: string;
    isConfirmation?: boolean = false;

    constructor(params?: Partial<VirementMessage>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}