import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { IUser } from "../core/models/user.model";
import State from "../state/app.state";
import * as AppActions from "../state/app.actions";
import { ISpecialty } from "../core/models/specialty.model";

interface AppState extends State {
  loggedInUser: IUser;
  appLoading: boolean;
  isDarkMode: boolean;
  error: any;
  specialties?: ISpecialty[];
}

const initialState: AppState = {
  loggedInUser: null,
  appLoading: false,
  isDarkMode: false,
  error: null,
  specialties: null
};

const appFeatureSelector = createFeatureSelector<AppState>('app');

export const userSelector = createSelector(
  appFeatureSelector,
  (state) => state.loggedInUser
);

export const specialtiesSelector = createSelector(
  appFeatureSelector,
  (state) => state.specialties
);

export const appLoadingSelector = createSelector(
  appFeatureSelector,
  (state) => state.appLoading
);

export const isDarkModeSelector = createSelector(
  appFeatureSelector,
  (state) => state.isDarkMode
);

export const appReducer = createReducer(initialState,
  on(AppActions.getCurrentUserSuccess, (state, action): AppState => {
    return {
      ...state,
      loggedInUser: action.loggedInUser
    };
  }),
  on(AppActions.clearCurrentUser, (state, action): AppState => {
    return {
      ...state,
      loggedInUser: null
    };
  }),
  on(AppActions.getCurrentUserFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AppActions.getSpecialtiesSuccess, (state, action): AppState => {
    return {
      ...state,
      specialties: action.specialties
    };
  }),
  on(AppActions.getSpecialtiesFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error
    };
  }),
)
