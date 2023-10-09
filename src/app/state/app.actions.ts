import { createAction, props } from '@ngrx/store';
import { IUser } from '../core/models/user.model';
import { ISpecialty } from '../core/models/specialty.model';

export const startAppInitializer = createAction(
  '[App] Start App Initializer'
);

export const finishAppInitializer = createAction(
  '[App] Finish App Initializer'
);


export const loginUser = createAction(
  '[User] Login',
  props<{ username: string, password: string }>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Successful',
  props<{ loggedInUser: IUser }>()
);

export const loginUserFail = createAction(
  '[User] Login User Failure',
  props<{ error: string }>()
);

export const getCurrentUser = createAction(
  '[User] Get Current User Data'
);

export const clearCurrentUser = createAction(
  '[User] Clear Current User Data'
);

export const getCurrentUserSuccess = createAction(
  '[User] Get Current User Data Successful',
  props<{ loggedInUser: IUser }>()
);

export const getCurrentUserFail = createAction(
  '[User] Get Current User Data Failure',
  props<{ error: string }>()
);

export const getSpecialties = createAction(
  '[Specialties] Get Specialties'
);

export const getSpecialtiesSuccess = createAction(
  '[Specialties] Get Specialties Successful',
  props<{ specialties: ISpecialty[] }>()
);

export const getSpecialtiesFail = createAction(
  '[Specialties] Get Specialties Failure',
  props<{ error: string }>()
);
