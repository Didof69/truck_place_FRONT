import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscribe } from 'src/app/models/subscribe';
import { User } from 'src/app/models/user';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  @Input() user!: User;
  isAdmin!: boolean;

  userSubscriptions: Subscribe[] = [];

  //paramètre pour gérer l'édition du UserProfil
  updateMode: boolean = false;
  isValid: boolean = true;

  constructor(
    private userService: UserService,
    private subscribeService: SubscribeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userService.isAdmin$.subscribe((data) => (this.isAdmin = data));

    this.subscribeService.userSubscription$.subscribe(
      (data) => (this.userSubscriptions = data)
    );
    this.subscribeService.getSubscriptionUser().subscribe({
      next: (response) => {
        this.subscribeService.userSubscription$.next(response);
      },
      error: (error) => {},
    });
  }

  onDeconnexion() {
    this.messageService.add({
      severity: 'success',
      summary: 'Déconnexion',
      detail: 'Vous êtes déconnecté(e).',
    });
    this.userService.isLog$.next(false);
    this.userService.isAdmin$.next(false);
    sessionStorage.clear();
  }

  onUserDelete() {
    this.userService.deleteUser(this.user.pseudo).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression de compte',
          detail: 'Votre compte a été supprimé avec succès.',
        });
        setTimeout(() => {
          sessionStorage.clear();
          this.userService.isLog$.next(false);
        }, 2000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Suppression de compte',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }

  onUserUpdate() {
    this.updateMode = !this.updateMode;
  }

  onUserUpdateSubmit() {
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
               this.messageService.add({
                 severity: 'success',
                 summary: 'Mise à jour ',
                 detail: 'Votre compte a été mis à jour avec succès.',
               });
        this.updateMode = false;
        this.isValid = true;
      },
      error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Mise à jour ',
            detail: 'Une erreur est survenue.',
          });
        this.isValid = false;
      },
    });
  }

  onSubscribeDelete(subscribe_id: number) {
    this.subscribeService.deleteSubscribe(subscribe_id).subscribe({
      next: (response) => {
        this.subscribeService.getSubscriptionUser().subscribe({
          next: (subscriptions) => {
            this.userSubscriptions = subscriptions;
                 this.messageService.add({
                   severity: 'success',
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
               summary: 'Abonnement',
               detail: 'Un problème est survenu.',
             });
      },
    });
  }
}
