import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Location } from 'src/app/models/location';
import { Parking } from 'src/app/models/parking';
import { LocationService } from 'src/app/services/location.service';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {
  parking: Parking = {
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

  location: Location = {
    insee_code: '',
    zip_code: '',
    city_name: '',
    longitude: '',
    latitude: '',
  };

  constructor(
    private parkingService: ParkingService,
    private locationService: LocationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // let myRoadmap = L.map('map').setView([45.75, 4.85], 12);
    const routeParam = this.route.snapshot.paramMap;
    const parkingIdFromRoute = Number(routeParam.get('id'));

    this.parkingService
      .getParkingById(parkingIdFromRoute)
      .subscribe((parking) => {
        console.log(parking);
        this.parking = parking;

        const myRoadmap = L.map('map').setView(
          [+parking.latitude, +parking.longitude],
          12
        );
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Truck Place',
        }).addTo(myRoadmap);

        const myIcon = L.icon({
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        });

        const popup = `<button type="button" data-bs-toggle="modal" data-bs-target="#parkingModal" style="font-size: 1rem;
    color: #ffffff;
    background-color: #337551;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.7rem;">
      ${this.parking.parking_name}</button>`;

        const marker = L.marker(
          [+this.parking.latitude, +this.parking.longitude],
          { icon: myIcon }
        )
          .bindPopup(popup)
          .addTo(myRoadmap)
          .openPopup();

        this.locationService
          .getLocationByInseeCode(this.parking.insee_code)
          .subscribe((location) => {
            console.log(this.parking.insee_code);
            this.location=location
            console.log('dans getLocation, la location est :', this.location);
          });
      });
  }
}
