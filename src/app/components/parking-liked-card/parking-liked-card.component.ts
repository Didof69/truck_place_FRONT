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
  }

  //vérifier qu'un parking soit égal à un autre
  isEqualParking(parking1: Parking, parking2: Parking): boolean {
    return parking1.parking_id === parking2.parking_id;
  }

  //supprime le parking des favoris du user
  onClick() {
    let index: number = -1;

    //retire le parking du tableau des favoris
    for (let i = 0; i < this.user.likedParkings.length; i++) {
      if (this.isEqualParking(this.user.likedParkings[i], this.parking)) {
        console.log('dans le parent', i);
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
}
