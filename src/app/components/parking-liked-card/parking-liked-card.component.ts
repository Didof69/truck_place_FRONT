import { Component, Input } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Parking } from 'src/app/models/parking';
import { User } from 'src/app/models/user';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parking-liked-card',
  templateUrl: './parking-liked-card.component.html',
  styleUrls: ['./parking-liked-card.component.css'],
})
export class ParkingLikedCardComponent {
  @Input() user!: User;
  @Input() parking!: Parking;
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

  constructor(
    private locationService: LocationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.locationService
      .getLocationByInseeCode(this.parking.insee_code)
      .subscribe((location) => {
        this.location = location;
      });

    //mettre à jour l'indicateur de fiabilité
    this.diffDates = this.differenceDateInMinuts(
      this.parking.registration_date
    );
    this.getReliability(this.diffDates);
  }

  //vérifier qu'un parking soit égal à un autre
  isEqualParking(parking1: Parking, parking2: Parking): boolean {
    return parking1.parking_id === parking2.parking_id;
  }

  //supprime le parking des favoris du user
  onClickDelete() {
    let index: number = 0;

    //retire le parking du tableau des favoris
    for (let i = 0; i < this.user.likedParkings.length; i++) {
      if (this.isEqualParking(this.user.likedParkings[i], this.parking)) {
        index = i;
      }
    }
    this.user.likedParkings.splice(index, 1);

    // met à jour le user
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        //ajouter toast pour confirmer l'ajout ou suppression dans favoris
      },
      error: (error) => {
        //gérer l'erreur
      },
    });
  }

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
}
