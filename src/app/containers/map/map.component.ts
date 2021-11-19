import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { getAllBicycleStations } from '../../stores/bicycleStations/bicycleStation.action';
import { BicycleStation } from '../../shared/models/BicycleStation';
import { MapService } from './map.service';
import { MarkerService } from 'src/app/shared/markers/marker.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  bicycleStation$ = this.store.select('bicycleStations').pipe(filter(stations => !!stations.length));

  constructor(private mapService: MapService,
    private markerService: MarkerService,
    private store: Store<{ bicycleStations: BicycleStation[] }>) {
  }

  ngOnInit(): void {
    this.mapService.initializeMap();
    this.markerService.getCurrentLocation(this.mapService.map);
    this.store.dispatch(getAllBicycleStations());
    this.bicycleStation$.subscribe((stations) => {
      this.markerService.createBicycleStationMarkers(stations, this.mapService.map)
    })
  }

}
