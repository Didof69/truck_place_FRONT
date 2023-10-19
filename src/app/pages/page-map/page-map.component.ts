import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { ParkingService } from 'src/app/services/parking.service';
import { Parking } from '../../models/parking';
// import { GeolocationService } from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./page-map.component.css'],
})
export class PageMapComponent {
  parkingTab!: Parking[];

  constructor(
    private parkingService: ParkingService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    
    const myRoadmap = L.map('frugalmap').setView([45.75, 4.85], 12);

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.parkingService.getParkings().subscribe((parkings) => {
      
      this.parkingTab = parkings;
console.log(this.parkingTab[1].latitude);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Truck Place',
      }).addTo(myRoadmap);

      for (let i = 0; i < this.parkingTab.length; i++) {
         const myIcon = L.icon({
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      });
      L.marker([+this.parkingTab[i].latitude, +this.parkingTab[i].longitude], {
        icon: myIcon,
      })
        .bindPopup(
          `<a href="http://www.ertoecasso.it/immagini/erto/viuzza.jpg">${this.parkingTab[i].parking_name} </a>`
          
        )
        .addTo(myRoadmap)
        .openPopup();
      }
     
    });

    // this.http
    //   .get(
    //     'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=bornes-podotactiles'
    //   )
    //   .subscribe((data: any) => {
    //     data.records.forEach(
    //       (podotactile: { geometry: { coordinates: number[] } }) => {
    //         L.marker(
    //           [
    //             podotactile.geometry.coordinates[1],
    //             podotactile.geometry.coordinates[0],
    //           ],
    //           { icon: myIcon }
    //         ).addTo(myRoadmap);
    //       }
    //     );
    //   });
  }
}
