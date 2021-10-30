import {createAction, props} from '@ngrx/store';
import {FinancialSourceModel} from "@models/financial-source.model";

export const GetFinancialSources = createAction(
    '[FinancialSources] Filter',
);
export const GetFinancialSourcesSuccess = createAction(
    '[FinancialSources] Filter success',
    props<{ payload: FinancialSourceModel[] }>(),
);
export const GetFinancialSourcesFailure = createAction(
    '[FinancialSources] Filter failure',
    props<{ error?: any }>(), // TODO defile errors global model here
);

export const UpdateFinancialSource = createAction(
    '[FinancialSources] Update',
    props<{ id: number}>(),
);
export const UpdateFinancialSourceSuccess = createAction(
    '[FinancialSources] Update success',
);
export const UpdateFinancialSourceFailure = createAction(
    '[FinancialSources] Update failure',
    props<{ error?: any }>(), // TODO defile errors global model here
);

export const DeleteFinancialSource = createAction(
    '[FinancialSources] Delete',
    props<{ id: number}>(),
);
export const DeleteFinancialSourceSuccess = createAction(
    '[FinancialSources] Delete success',
);
export const DeleteFinancialSourceFailure = createAction(
    '[FinancialSources] Delete failure',
    props<{ error?: any }>(), // TODO defile errors global model here
);
