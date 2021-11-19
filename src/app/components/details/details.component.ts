import { AfterViewChecked, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Injector, OnInit, Type, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { AppService } from 'src/app/app.service';
import { MapService } from 'src/app/containers/map/map.service';
import { MarkerService } from 'src/app/shared/markers/marker.service';
import { BicycleStation } from 'src/app/shared/models/BicycleStation';
import { HelperService } from 'src/app/utils/helperService';
import { WidgetType } from '../widget/widgetType.enum';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements AfterViewChecked {

  @ViewChild('details')
  detailsRef: ElementRef;

  widgetType = WidgetType;
  positionPoint: L.LatLng;
  distanceFromCurrentPosition: string;
  address: string;
  station: BicycleStation;

  popup: L.Popup;

  checkedStation$ = this.store.select('checkedBicycleStation');

  constructor(private service: AppService,
    private markerService: MarkerService,
    private helperService: HelperService,
    private store: Store<{ checkedBicycleStation: BicycleStation }>,
    private cd: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.checkedStation$
      .subscribe(async (bicycleStation) => {
        this.station = bicycleStation;
        if (this.station) {
          this.positionPoint = L.latLng(this.station.geometry.coordinates[1], this.station.geometry.coordinates[0]);
          this.getDistanceBetweenTwoPoints();
          if (!this.address) {
            this.address = await this.reverseGeocoding();
          }
        }
        this.cd.detectChanges();
      })
  }

  getDistanceBetweenTwoPoints() {
    if (this.markerService.currentLocation) {
      this.distanceFromCurrentPosition = this.helperService.getDistanceBetweenTwoPoints(this.positionPoint, this.markerService.currentLocation);
    }
  }

  async reverseGeocoding(): Promise<string> {
    let url = this.helperService.reverseGeocodingUrl(this.positionPoint.lat, this.positionPoint.lng);
    return new Promise((resolve, reject) => {
      this.service.getAddress(url).subscribe((data) => {
        let address = data.address.road + ", " + data.address.city;
        resolve(address);
      }, err => reject());
    });
  }


}
