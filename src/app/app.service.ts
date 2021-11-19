import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BicycleStations } from './shared/models/BicycleStations';
import { BICYCLE_STATION_URL } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getAllStations(): Observable<BicycleStations> {
    return this.http.get<BicycleStations>(BICYCLE_STATION_URL);
  }

  getAddress(reverseGeocodingUrl: string) : Observable<any> {
   return this.http.get<any>(reverseGeocodingUrl);
  }
}
