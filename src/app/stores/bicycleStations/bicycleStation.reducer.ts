import { Action, createReducer, on } from '@ngrx/store';
import { checkBicycleStation, getAllBicycleStationsSuccess } from './bicycleStation.action';

export const initialState = [];
export const initialCheckedState: any = null;

const _bicycleStationsReducer = createReducer(
    initialState,
    on(getAllBicycleStationsSuccess, (state, { bicycleStations }) => (bicycleStations as []))
);

export function bicycleStationReducer(state: any, action: Action) {
    return _bicycleStationsReducer(state, action);
}

const _checkedStationReducer = createReducer(
    initialCheckedState,
    on(checkBicycleStation, (state, { checkedStation }) => { return checkedStation; })
);

export function checkedStationReducer(state: any, action: Action) {
    return _checkedStationReducer(state, action);
}