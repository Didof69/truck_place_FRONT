import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Location } from 'src/app/models/location';
import { Opinion } from 'src/app/models/opinion';
import { Parking } from 'src/app/models/parking';
import { LocationService } from 'src/app/services/location.service';
import { ParkingService } from 'src/app/services/parking.service';
import { OpinionByMember } from 'src/app/models/opinion-by-member';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {
  user!:User;
  parking: Parking = {
    parking_id: 0,
    parking_name: 'test',
    latitude: '',
    longitude: '',
    nb_space_all: 0,
    nb_space_free: 0,
    registration_date: new Date(),
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

  //parametrer l'indicateur de fiabilité
  reliabilityStatus!: string;
  diffDates: number = 0;

  //parametrer la moyenne du marking
  opinionsTab!: Opinion[];
  opinionsMembersTab: OpinionByMember[] = [];
  averageParking: number = 0;
  numberOpinions: number = 0;

  constructor(
    private parkingService: ParkingService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    // let myRoadmap = L.map('map').setView([45.75, 4.85], 12);
    const routeParam = this.route.snapshot.paramMap;
    const parkingIdFromRoute = Number(routeParam.get('id'));

    this.parkingService
      .getParkingById(parkingIdFromRoute)
      .subscribe((parking) => {
        //recuperer le User
        this.userService.getUserByPseudo().subscribe({
           next: (response) => {
             this.user = response;
           },

           error: (error) => {},
         });
        // console.log(parking);
        this.parking = parking;

        //mettre à jour l'indicateur de fiabilité
        this.diffDates = this.differenceDateInMinuts(
          this.parking.registration_date
        );
        this.getReliability(this.diffDates);
        // console.log(this.diffDates, this.reliabilityStatus);

        //charger la map et le marqueur du parking
        const myRoadmap = L.map('map').setView(
          [+parking.latitude, +parking.longitude],
          12
        );
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Truck Place',
        }).addTo(myRoadmap);

        const myIcon = L.icon({
          iconUrl: '../../../../assets/icones/pin_park.png',
        });

        const popup = `<button type="button" data-bs-toggle="modal" data-bs-target="#parkingModal" style="
        font-size: 1rem;
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

        //récuperer le code postal et la ville grâce à insee_code
        this.locationService
          .getLocationByInseeCode(this.parking.insee_code)
          .subscribe((location) => {
            this.location = location;
          });

        //récupérer les avis d'un parking
        this.parkingService
          .getOpinionsByParkingId(this.parking.parking_id)
          .subscribe((opinions) => {
            this.opinionsTab = [...opinions];
            this.numberOpinions = this.opinionsTab.length;
            if (this.opinionsTab.length > 0) {
              this.averageParking = this.getAverageParking(this.opinionsTab);
            }
            //parametrer les avis à afficher pour un parking
            const opinionsFullTab = [...opinions];
            for (let i = 0; i < opinionsFullTab.length; i++) {
              const opinion = {
                pseudo: opinionsFullTab[i].user.pseudo,
                opinion: opinionsFullTab[i].opinion,
                note: opinionsFullTab[i].note,
              };
              // console.log(opinion);
              this.opinionsMembersTab.push(opinion);
            }
            // console.log(this.opinionsMembersTab);
          });
        
      
      });
  }

  //méthodes utiles

  //obtenir l'indicateur de fiabilité
  differenceDateInMinuts(value: Date) {
    const today = new Date();
    const date = new Date(value);
    const diff = (today.getTime() - date.getTime()) / 60000;
    return diff;
  }
  getReliability(value: number) {
    if (value <= 30) {
      this.reliabilityStatus = 'reliabilitySafe';
      return;
    }
    if (value <= 60) {
      this.reliabilityStatus = 'reliabilityMedium';
      return;
    }
    if (value > 60) {
      this.reliabilityStatus = 'reliabilityDanger';
      return;
    }
  }

  //obtenir la moyenne d'un parking
  getAverageParking(opinionsTab: Opinion[]): number {
    const allNote: number[] = [];
    for (let i = 0; i < opinionsTab.length; i++) {
      allNote.push(opinionsTab[i].note);
    }
    const averageParking = Math.round(
      allNote.reduce((bcc, v) => bcc + v) / allNote.length
    );
    return averageParking;
  }
}
