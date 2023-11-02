import { Component } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';

import * as L from 'leaflet';
import { ParkingService } from 'src/app/services/parking.service';
import { Parking } from '../../models/parking';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./page-map.component.css'],
})
export class PageMapComponent {
  parkingTab!: Parking[];
  // locationsList!: Location[];
  // filteredLocations: Location[] = [];
  myRoadmap!: L.Map;

  constructor(
    private parkingService: ParkingService,
    private readonly geolocation$: GeolocationService
  ) {}

  ngOnInit() {
    // Déclaration de la carte en fonction de la geolocalisation
    if (!navigator.geolocation) {
      this.myRoadmap = L.map('map').setView([45.75, 4.85], 12);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.myRoadmap = L.map('map').setView(
          [position.coords.latitude, position.coords.longitude],
          12
        );
        const myIcon = L.icon({
          iconUrl: '../../../../assets/icones/target.png',
        });
        const popup = 'Vous êtes ici';
        L.marker([position.coords.latitude, position.coords.longitude], {
          icon: myIcon,
        })
          .bindPopup(popup)
          .addTo(this.myRoadmap)
          .openPopup(); 
      });
    }

    this.parkingService.getParkings().subscribe((parkings) => {
      this.parkingTab = parkings;
      // console.log(this.parkingTab[1].latitude);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Truck Place',
      }).addTo(this.myRoadmap);

      //pointe les parking de carte
      for (let i = 0; i < this.parkingTab.length; i++) {
        const myIcon = L.icon({
          iconUrl: '../../../../assets/icones/pin_park.png',
        });
        L.marker(
          [+this.parkingTab[i].latitude, +this.parkingTab[i].longitude],
          { icon: myIcon,}
        )
          .bindPopup(
            `<a href="map/parking/${this.parkingTab[i].parking_id}" 
            style="font-size: 1rem;color: #337551;">Accéder au parking : ${this.parkingTab[i].parking_name}</a>`
          )
          .addTo(this.myRoadmap)
      }
    });
  }
  getPosition() {}

  onSearchLocation(location: Location) {
    const myIcon = L.icon({
      iconUrl: '../../../../assets/icones/pin_park.png',
    });

    L.marker([+location.latitude, +location.longitude], { icon: myIcon, })
      .bindPopup(`${location.city_name}`)
      .addTo(this.myRoadmap)
      .openPopup();
  }
}
