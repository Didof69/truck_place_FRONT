import { AfterViewInit, Component } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';

import * as L from 'leaflet';
import { ParkingService } from 'src/app/services/parking.service';
import { Parking } from '../../models/parking';
import { Location } from 'src/app/models/location';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./page-map.component.css'],
})
export class PageMapComponent implements AfterViewInit {
  parkingTab!: Parking[];
  myRoadmap!: L.Map;

  //paramètre l'état de la connexion
  isLog!: Boolean;

  //parametre de la géolocalisation
  latitude!: number;
  longitude!: number;

  constructor(
    private parkingService: ParkingService,
    private readonly geolocation$: GeolocationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isLog$.subscribe((data) => (this.isLog = data));
  }

  ngAfterViewInit() {
    // Vérifiez si l'élément 'map' est disponible dans le DOM
    const mapElement = document.getElementById('map');

    if (mapElement) {
      // Continuez avec l'initialisation de la carte ici
      if (!navigator.geolocation) {
        this.latitude = 45.75;
        this.longitude = 4.85;
        this.myRoadmap = L.map('map').setView(
          [this.latitude, this.longitude],
          12
        );
        this.setMarkerMap();
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.myRoadmap = L.map('map').setView(
            [this.latitude, this.longitude],
            16
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
          this.setMarkerMap();
        });
      }
    }
  }

  setMarkerMap() {
    this.parkingService.getAllParkings().subscribe((parkings) => {
      this.parkingTab = parkings;
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Truck Place',
      }).addTo(this.myRoadmap);

      //pointe les parkings sur la carte
      for (let i = 0; i < this.parkingTab.length; i++) {
        const myIcon = L.icon({
          iconUrl: '../../../../assets/icones/pin_park.png',
        });
        L.marker(
          [+this.parkingTab[i].latitude, +this.parkingTab[i].longitude],
          { icon: myIcon }
        )
          .bindPopup(
            `<a href="map/parking/${this.parkingTab[i].parking_id}" 
            style="font-size: 1rem;color: #337551;">Accéder au parking : ${this.parkingTab[i].parking_name}</a>`
          )
          .addTo(this.myRoadmap);
      }
    });
  }

  onSearchLocation(location: Location) {
    const myIcon = L.icon({
      iconUrl: '../../../../assets/icones/marker.png',
    });

    L.marker([+location.latitude, +location.longitude], { icon: myIcon })
      .bindPopup(`${location.city_name}`)
      .addTo(this.myRoadmap)
      .openPopup();
  }
}
