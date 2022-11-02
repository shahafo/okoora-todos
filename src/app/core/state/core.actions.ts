import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/user.model";

export const loadUser = createAction('[core] load user', props<{ username: string }>());
export const loadUserGood = createAction('[core] load user good', props<{ user: IUser }>());
export const loadUserBad = createAction('[core] load user bad', props<{ error: string }>());
