import { createAction, props } from '@ngrx/store';
import { BicycleStation } from '../../shared/models/BicycleStation';

export const getAllBicycleStations = createAction('[BicycleStations] getAll');
export const getAllBicycleStationsSuccess = createAction('[BicycleStations] getAll Success', props<{ bicycleStations: BicycleStation[] }>());
export const checkBicycleStation = createAction('[Check station] check', props<{ checkedStation: BicycleStation | undefined }>());