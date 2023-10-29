import { Component } from '@angular/core';

import * as L from 'leaflet';
import { ParkingService } from 'src/app/services/parking.service';
import { Parking } from '../../models/parking';
import { Location } from 'src/app/models/location';
// import { GeolocationService } from '@ng-web-apis/geolocation';

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
  
  constructor(private parkingService: ParkingService){}

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.myRoadmap = L.map('map').setView([45.75, 4.85], 12);

    this.parkingService.getParkings().subscribe((parkings) => {
      this.parkingTab = parkings;
      // console.log(this.parkingTab[1].latitude);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Truck Place',
      }).addTo(this.myRoadmap);

      for (let i = 0; i < this.parkingTab.length; i++) {
        const myIcon = L.icon({
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        });
        L.marker(
          [+this.parkingTab[i].latitude, +this.parkingTab[i].longitude],
          {
            icon: myIcon,
          }
        )
          .bindPopup(
            `<a href="map/parking/${this.parkingTab[i].parking_id}" 
            style="font-size: 1rem;color: #337551;">Accéder au parking : ${this.parkingTab[i].parking_name}</a>`
          )
          .addTo(this.myRoadmap)
          .openPopup();
      }
    });
  }

  onSearchLocation(location: Location) {
    const myIcon = L.icon({
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
    });
    L.marker([+location.latitude, +location.longitude], {
      icon: myIcon,
    })
      .bindPopup(`${location.city_name}`)
      .addTo(this.myRoadmap)
      .openPopup();
  }
}
