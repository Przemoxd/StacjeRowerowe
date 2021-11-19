import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { bicycleStationReducer, checkedStationReducer } from 'src/app/stores/bicycleStations/bicycleStation.reducer';
import { HelperService } from 'src/app/utils/helperService';
import { MapComponent } from './map.component';

import { MapService } from './map.service';

describe('mapService', () => {
    let service: MapService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MapComponent],
            imports: [StoreModule.forRoot({ bicycleStations: bicycleStationReducer, checkedBicycleStation: checkedStationReducer }, {})],
            providers: [MapService,
                HelperService
            ]
        });
        service = TestBed.inject(MapService);
    });

    it('when there is no current bound to default', () => {
        let fixture = TestBed.createComponent(MapComponent);
        let compInstance = fixture.componentInstance;
        let compiled = fixture.debugElement.nativeElement;
        service.initializeMap();

        expect(service.map.getBounds().contains([[52.409538, 16.931992], [52.409538, 16.931992]])).toBeTruthy();
    });
});
