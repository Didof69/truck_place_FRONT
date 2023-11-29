import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { User } from 'src/app/models/user';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { CreatedSubscribe } from 'src/app/models/created-subscribe';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parking-modal',
  templateUrl: './parking-modal.component.html',
  styleUrls: ['./parking-modal.component.css'],
})
export class ParkingModalComponent {
  @Input() parking!: Parking;
  @Input() isParkingLiked!: boolean;
  @Input() location!: Location;
  @Input() reliabilityStatus!: string;
  @Input() numberOpinions!: number;
  @Input() averageParking!: number;
  @Input() user!: User;
  @Input() isAdmin!: boolean;

  isClicked: boolean = false;
  isValid: boolean = true;
  isSubscribed: boolean = false;
  isLog: boolean = false;
  @Output() likeEvent = new EventEmitter();
  constructor(
    private router: Router,
    private subscribeService: SubscribeService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isLog$.subscribe((data) => this.isLog = data);

    if (this.isLog) {
      this.subscribeService
      .getSubscriptionUser()
      .subscribe({
        next: (userSubscriptions) => {
          userSubscriptions.forEach((susbcription) => {
            if (
              this.isEqualParking(
                susbcription.parking_id,
                this.parking.parking_id
              )
            ) {
              this.isSubscribed = true;
            }
          })
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Chargement des données',
            detail: 'Une erreur est survenue.',
          });
        }
      });
    }
    
  }

  returnMap() {
    this.router.navigate(['/map']);
  }

  onLikeBtn() {
    this.likeEvent.emit();
    this.isParkingLiked = !this.isParkingLiked;
  }

  onSubscribeBtn() {
    this.isClicked = !this.isClicked;
  }

  onChangeHourSubscribe(nbHour: number) {
    if (nbHour > 12) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  //s'abonne au parking
  onSubscribeSubmit(nb: number) {
    let unsubscribe_date = new Date();
    unsubscribe_date.setHours(unsubscribe_date.getHours() + nb);

    const newSubscribe: CreatedSubscribe = {
      unsubscribe_date: unsubscribe_date,
      user_id: this.user.user_id,
      parking_id: this.parking.parking_id,
    };

    this.subscribeService.createSubscribe(newSubscribe).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Abonnement',
          detail: `L'abonnement a été pris en compte pour ${nb} heure(s)`,
        });
        
        this.isClicked = false;
        this.isSubscribed = true;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Abonnement',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }

  //vérifier qu'un parking soit égal à un autre
  isEqualParking(parking_id1: number, parking_id2: number): boolean {
    return parking_id1 === parking_id2;
  }

 //désabonne du parking
  onUnsubscribeBtn() {
    this.subscribeService
      .getSubscriptionUser()
      .subscribe((userSubscriptions) => {
        userSubscriptions.forEach((susbcription) => {
          if (
            this.isEqualParking(
              susbcription.parking_id,
              this.parking.parking_id
            )
          ) {
            this.subscribeService
              .deleteSubscribe(susbcription.subscribe_id)
              .subscribe({
                next: (response) => {
                  this.messageService.add({
                    severity: 'warn',
                    summary: 'Abonnement',
                    detail: "L'abonnement a été supprimé.",
                  });
                  this.isSubscribed = false;
                },
                error: (error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Abonnement',
                    detail: 'Une erreur est survenue.',
                  });
                },
              });
          }
        });
      });
  }
}
