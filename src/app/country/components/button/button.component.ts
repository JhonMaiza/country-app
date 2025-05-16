import { Component, input, output, signal } from '@angular/core';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'country-button',
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  selectedRegion = signal< Region | null >( null );
  regions = input<Region[]>();
  region = output<Region>();

  onClickRegion( region: Region){
    this.selectedRegion.set(region);
    this.region.emit( region )
  }
}
