import { Component, Input } from '@angular/core';
import { Parking } from 'src/app/models/parking';

@Component({
  selector: 'app-parking-modal',
  templateUrl: './parking-modal.component.html',
  styleUrls: ['./parking-modal.component.css']
})
export class ParkingModalComponent {
  @Input() parking!: Parking;

  ngOnInit() {
    this.parking = {
      parking_id: 0,
      parking_name: 'test',
      latitude: '',
      longitude: '',
      nb_space_all: 0,
      nb_space_free: 0,
      public_view: true,
      insee_code: '',
      user_id: 0,
      services: [{ service_id: 0, service_name: '' }],
    };
    console.log('dans on init, le parking est ',this.parking);
  }  
}
