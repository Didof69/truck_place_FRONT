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
  parking!: Parking;
  parking_id!: number;
  
  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myRoadmap = L.map('map').setView([45.75, 4.85], 12);

    this.parkingService.getParkings().subscribe((parkings) => {
      this.parkingTab = [...parkings];

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Truck Place',
      }).addTo(myRoadmap);

      for (let i = 0; i < this.parkingTab.length; i++) {
        const myIcon = L.icon({
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        });

        const popup = `<button id="${[
          i,
        ]}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#parkingModal">
      ${this.parkingTab[i].parking_name}</button>`;

        const marker = L.marker(
          [+this.parkingTab[i].latitude, +this.parkingTab[i].longitude],
          { icon: myIcon }
        )
          .bindPopup(popup)
          .addTo(myRoadmap)
          .openPopup();
        
this.getButtonId(i)
      }
    });
  }

  getButtonId(id:number) {
     const buttonElement = document.getElementById(`${id}`);
     if (buttonElement) {
       buttonElement.addEventListener('click', (event) => {
         const button = event.currentTarget as HTMLButtonElement;
         if (button && button.id) {
           const buttonId = button.id;
           console.log('ID du bouton cliqué :', buttonId);
           // Vous pouvez utiliser la valeur de l'ID comme nécessaire
         }
       });
     }
  }

  getParkingById(parking_id: number): Parking {
    console.log('coucou');

    this.parkingService.getParkingsById(parking_id).subscribe((parking) => {
      this.parking = parking;
    });
    console.log('parking', this.parking);
    return this.parking;
  }
}


