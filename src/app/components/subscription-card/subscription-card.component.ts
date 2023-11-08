import { Component, Input } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Parking } from 'src/app/models/parking';
import { Subscribe } from 'src/app/models/subscribe';
import { LocationService } from 'src/app/services/location.service';
import { ParkingService } from 'src/app/services/parking.service';
import { SubscribeService } from 'src/app/services/subscribe.service';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.css'],
})
export class SubscriptionCardComponent {
  @Input() subscription!: Subscribe;
  @Input() userSubscriptions!: Subscribe[];
  parking!: Parking;
  location!: Location;
  remainingHours!: number;

  constructor(
    private parkingService: ParkingService,
    private locationService: LocationService,
    private subscribeService: SubscribeService
  ) {}

  ngOnInit() {
    this.remainingHours = this.calculateRemainingHours(
      this.subscription.unsubscribe_date
    );
    this.parkingService.getParkingById(this.subscription.parking_id).subscribe({
      next: (parking) => {
        this.parking = parking;
        this.locationService
          .getLocationByInseeCode(this.parking.insee_code)
          .subscribe({
            next: (location) => (this.location = location),
            error: (error) => {
              //gerer l'erreur
            },
          });
      },
      error: (error) => {
        //gérer l'erreur
      },
    });
  }

  //calcul le temps en heure restant de subscription
  calculateRemainingHours(date: Date): number {
    const today = new Date();
    const unsubscribe_date = new Date(date);
    const reaminingHours = Math.round(
      (unsubscribe_date.getTime() - today.getTime()) / 3600000
    );
    return reaminingHours;
  }

  onClickDelete() {
    this.subscribeService
      .deleteSubscribe(this.subscription.subscribe_id)
      .subscribe({
        next: (response) => {
          this.subscribeService.getSubscriptionUser().subscribe({
            next: (subscriptions) => {
              this.subscribeService.userSubscription$.next(subscriptions);
            },
            error: (error) => {
              //gerer l'erreur
            },
          });
        },
        error: (error) => {
          //gerer l'erreur
        },
      });
  }
}
