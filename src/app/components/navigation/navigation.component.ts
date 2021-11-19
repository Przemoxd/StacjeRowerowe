import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkBicycleStation } from 'src/app/stores/bicycleStations/bicycleStation.action';
import { BicycleStation } from 'src/app/shared/models/BicycleStation';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewChecked {

  show: boolean;

  checkedStation$ = this.store.select('checkedBicycleStation');

  constructor(private store: Store<{ checkedBicycleStation: BicycleStation }>, private cd: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.checkedStation$.subscribe(async (bicycleStation) => {
      this.show = !!bicycleStation;
      this.cd.detectChanges();
    })
  }

  back(){
    this.store.dispatch(checkBicycleStation({ checkedStation: undefined }));
  }

}
