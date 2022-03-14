import { RegionsModel } from '@models/addresses.model';
import { createAction, props } from '@ngrx/store';

export const CreateRegion = createAction(
  '[Region] Create encours',
  props<{ payload: RegionsModel }>()
);
export const CreateRegionSuccess = createAction(
  '[Region] Create encours',
  props<{ payload: RegionsModel }>()
);
export const CreateRegionFailure = createAction(
  '[Region] Create encours',
  props<{ error?: any }>()
);

export const DeleteRegion = createAction(
  '[Region] Delete',
  props<{ id: number }>()
);

export const DeleteRegionSuccess = createAction('[Region] Delete success');
export const DeleteRegionFailure = createAction('[Region] Delete failure');
