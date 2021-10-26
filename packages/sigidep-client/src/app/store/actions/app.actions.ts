import {createAction, props} from '@ngrx/store';
import {Message} from "primeng/api/message";

export const ShowToast = createAction(
    '[APP] Show Toast',
    props<{ payload: Message }>()
);
