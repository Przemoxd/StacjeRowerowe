import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './containers/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BicycleStationsEffects } from './stores/bicycleStations/bicycleStation.effects';
import { MapService } from './containers/map/map.service';
import { bicycleStationReducer, checkedStationReducer } from './stores/bicycleStations/bicycleStation.reducer';
import { AvailableBikesComponent } from './components/widget/widget.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DetailsComponent } from './components/details/details.component';
import { HelperService } from './utils/helperService';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DetailsComponent,
    AvailableBikesComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ bicycleStations: bicycleStationReducer, checkedBicycleStation: checkedStationReducer }, {}),
    EffectsModule.forRoot([BicycleStationsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
    }),
  ],
  providers: [MapService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
