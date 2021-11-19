import { Component, Input, OnInit } from '@angular/core';
import { WidgetType } from './widgetType.enum';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class AvailableBikesComponent {

  @Input()
  quantity: string;

  @Input()
  type: WidgetType;
}
