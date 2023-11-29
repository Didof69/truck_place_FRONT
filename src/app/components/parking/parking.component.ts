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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {
  user!: User;
  isAdmin!: boolean;
  isLog!: boolean;

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

  isParkingLiked: boolean = false;

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

  //parametrer la moyenne du parking
  opinionsMembersTab: OpinionByMember[] = [];
  averageParking: number = 0;
  numberOpinions: number = 0;

  constructor(
    private parkingService: ParkingService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
        this.userService.isLog$.subscribe((data) => (this.isLog = data));

    this.parkingService.parking$.subscribe((data) => {
      this.parking = data;
      this.diffDates = this.differenceDateInMinuts(
        this.parking.registration_date
      );
      this.getReliability(this.diffDates);
    });

    const routeParam = this.route.snapshot.paramMap;
    const parkingIdFromRoute = Number(routeParam.get('id'));

    this.parkingService
      .getParkingById(parkingIdFromRoute)
      .subscribe((parking) => {
        this.parkingService.parking$.next(parking);

        //recuperer le User
        if (this.isLog) {
                 this.userService.getUserByPseudo().subscribe({
          next: (response) => {
            this.user = response;
            this.isAdmin = this.user.admin;

            //vérifie si le parking est dans les favoris
            if (
              this.user.likedParkings.some((parking) =>
                this.isEqualParking(parking, this.parking)
              )
            ) {
              this.isParkingLiked = true;
            }
          },

          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: "Chargement de données",
              detail:
                'Une erreur est survenue.',
            });
          },
        }); 
        }

        //mettre à jour l'indicateur de fiabilité
        this.diffDates = this.differenceDateInMinuts(
          this.parking.registration_date
        );
        this.getReliability(this.diffDates);

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
        this.getOpinionsMembers();
        this.parkingService.opinionsMembersTab$.subscribe(
          (opinions) => (this.opinionsMembersTab = opinions)
        );
        this.parkingService.averageParking$.subscribe(
          (average) => (this.averageParking = average)
        );
        this.parkingService.numberOpinions$.subscribe(
          (number) => (this.numberOpinions = number)
        );
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

  //vérifier qu'un parking soit égal à un autre
  isEqualParking(parking1: Parking, parking2: Parking): boolean {
    return parking1.parking_id === parking2.parking_id;
  }

  //gère la mise en favori du parking
  onClickLike() {
    let index: number = -1;

    if (
      this.user.likedParkings.some((parking) =>
        this.isEqualParking(parking, this.parking)
      )
    ) {
      //retire le parking du tableau des favoris
      for (let i = 0; i < this.user.likedParkings.length; i++) {
        if (this.isEqualParking(this.user.likedParkings[i], this.parking)) {
          index = i;
        }
      }
      this.user.likedParkings.splice(index, 1);
      this.isParkingLiked = false;
    } else {
      //ajoute le parking du tableau des favoris
      this.user.likedParkings.push(this.parking);
      this.isParkingLiked = true;
    }

    // met à jour le user
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        if (this.isParkingLiked) {
          this.messageService.add({
            severity: 'success',
            summary: 'Favoris',
            detail: 'Le parking a été ajouté à vos favoris.',
          });
        }
        if (!this.isParkingLiked) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Favoris',
            detail: 'Le parking a été supprimé de vos favoris.',
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Favoris',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }

  //récuperer le tableau des opinions pour le parking
  getOpinionsMembers(): OpinionByMember[] {
    this.parkingService
      .getOpinionsByParkingId(this.parking.parking_id)
      .subscribe({
        next: (opinions) => {
          const opinionsTab = [...opinions];
          this.parkingService.numberOpinions$.next(opinionsTab.length);
          if (opinionsTab.length > 0) {
            this.parkingService.averageParking$.next(
              this.getAverageParking(opinionsTab)
            );
          }

          //parametrer les avis à afficher pour un parking
          const opinionsFullTab = [...opinions];
          for (let i = 0; i < opinionsFullTab.length; i++) {
            const opinion = {
              pseudo: opinionsFullTab[i].user.pseudo,
              opinion: opinionsFullTab[i].opinion,
              note: opinionsFullTab[i].note,
            };
            this.opinionsMembersTab.push(opinion);
          }
          this.parkingService.opinionsMembersTab$.next(this.opinionsMembersTab);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Chargement des données',
            detail: 'Une erreur est survenue.',
          });
        },
      });
    return this.opinionsMembersTab;
  }
}
