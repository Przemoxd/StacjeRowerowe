import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { checkBicycleStation } from '../../stores/bicycleStations/bicycleStation.action';
import { BicycleStation } from '../models/BicycleStation';
import { HelperService } from '../../utils/helperService';
import { Icons } from 'src/app/utils/icons';
import { DetailsComponent } from 'src/app/components/details/details.component';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  currentLocation: L.LatLng;

  constructor(private store: Store<{ checkedBicycleStation: BicycleStation }>, private helperService: HelperService) { }

  createStationMarker(station: BicycleStation, map: L.Map) {
    const coordinates = this.helperService.getCoordinates(station.geometry.coordinates);
    var marker = L.marker(coordinates, { icon: Icons.getStationIcon() });
    return marker;
  }

  createCurrentPositionMarker(latlng: L.LatLng) {
    return L.marker(latlng, { icon: Icons.getCurrentLocationIcon() });
  }

  createBicycleStationMarkers(stations: Array<BicycleStation>, map: L.Map) {
    stations.forEach(station => {
      let marker = this.createStationMarker(station, map).addTo(map);
      this.selectBicycleStation(marker, station);
    })
  }

  selectBicycleStation(marker: L.Marker, station: BicycleStation) {
    marker.on('click', () => {
      this.store.dispatch(checkBicycleStation({ checkedStation: station }));
      if (!marker.getPopup()) {
        marker.bindPopup(this.helperService.getComponent(DetailsComponent)).openPopup();
      }
    })
  }

  getCurrentLocation(map: L.Map) {
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', ({ latlng }) => {
      this.currentLocation = latlng;
      this.createCurrentPositionMarker(latlng).addTo(map);
    })
  }


}


