import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  remainingTime!: number;
  isMinute = true;

  //parametrer l'indicateur de fiabilité
  reliabilityStatus!: string;
  diffDates: number = 0;

  constructor(
    private parkingService: ParkingService,
    private locationService: LocationService,
    private subscribeService: SubscribeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.remainingTime = this.calculateRemainingMinutes(
      this.subscription.unsubscribe_date
    );
    if (this.remainingTime > 60) {
      this.remainingTime = Math.round(this.remainingTime / 60);
      this.isMinute = false;
    }

    this.parkingService.getParkingById(this.subscription.parking_id).subscribe({
      next: (parking) => {
        this.parking = parking;

        //mettre à jour l'indicateur de fiabilité
        this.diffDates = this.differenceDateInMinuts(
          this.parking.registration_date
        );
        this.getReliability(this.diffDates);

        //récupère le code postal et le nom de la vill
        this.locationService
          .getLocationByInseeCode(this.parking.insee_code)
          .subscribe({
            next: (location) => (this.location = location),
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Chargement',
                detail: 'Un problème est survenu.',
              });
            },
          });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Chargement',
          detail: 'Un problème est survenu.',
        });
      },
    });
  }

  //calcul le temps en heure restant de subscription
  calculateRemainingMinutes(date: Date): number {
    const today = new Date();
    const unsubscribe_date = new Date(date);
    const remainingTime = Math.ceil(
      (unsubscribe_date.getTime() - today.getTime()) / 60000
    );
    return remainingTime;
  }

  onClickDelete() {
    this.subscribeService
      .deleteSubscribe(this.subscription.subscribe_id)
      .subscribe({
        next: (response) => {
          this.subscribeService.getSubscriptionUser().subscribe({
            next: (subscriptions) => {
              this.subscribeService.userSubscription$.next(subscriptions);
              this.messageService.add({
                severity: 'warn',
                summary: 'Abonnement',
                detail: 'Votre abonnemnent a été supprimé.',
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Abonnement',
                detail: 'Un problème est survenu.',
              });
            },
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Chargement',
            detail: 'Un problème est survenu.',
          });
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
