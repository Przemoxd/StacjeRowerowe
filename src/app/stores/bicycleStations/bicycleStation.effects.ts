import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { getAllBicycleStations, getAllBicycleStationsSuccess } from './bicycleStation.action';

@Injectable()
export class BicycleStationsEffects {
    constructor(private actions$: Actions,
        private service: AppService) { }

    loadStations$ = createEffect(() => this.actions$.pipe(
        ofType(getAllBicycleStations),
        mergeMap(() => this.service.getAllStations()
            .pipe(
                map(bicycleStations => getAllBicycleStationsSuccess({ bicycleStations: bicycleStations.features })),
                catchError(() => EMPTY)
            )
        )
    ));
}