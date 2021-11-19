import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as L from 'leaflet';
import { checkBicycleStation, } from "../../stores/bicycleStations/bicycleStation.action";
import { MarkerService } from "../../shared/markers/marker.service";
import { BicycleStation } from "../../shared/models/BicycleStation";

const DEFAULT_ZOOM: number = 14;
const DEFAULT_COORDINATES: L.LatLngExpression = [52.409538, 16.931992];// Dla uproszczenia wspolrzedne Poznania

@Injectable()
export class MapService {

    map!: L.Map;
    currentLocation: L.LatLng;
    constructor(private store: Store<{ checkedBicycleStation: BicycleStation }>) {
    }

    initializeMap() {
        this.map = L.map('map', { zoomControl: false, tap:false }).setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.map.on('click', () => {
           this.store.dispatch(checkBicycleStation({ checkedStation: undefined }));
        })
    }



}