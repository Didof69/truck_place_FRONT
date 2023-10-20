import { Component, Input } from '@angular/core';
import { Parking } from 'src/app/models/parking';

@Component({
  selector: 'app-parking-modal',
  templateUrl: './parking-modal.component.html',
  styleUrls: ['./parking-modal.component.css']
})
export class ParkingModalComponent {
  @Input() parking!: Parking;
}
