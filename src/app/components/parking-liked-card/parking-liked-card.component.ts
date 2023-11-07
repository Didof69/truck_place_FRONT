import { Component, Input } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Parking } from 'src/app/models/parking';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-parking-liked-card',
  templateUrl: './parking-liked-card.component.html',
  styleUrls: ['./parking-liked-card.component.css'],
})
export class ParkingLikedCardComponent {
  @Input() parking!: Parking;
  location: Location = {
    insee_code: '',
    zip_code: '',
    city_name: '',
    longitude: '',
    latitude: '',
  };

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService
      .getLocationByInseeCode(this.parking.insee_code)
      .subscribe((location) => {
        this.location = location;
      });
  }
}
