import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  userSubscriptions: Subscribe[] = [];

  //paramètre pour gérer l'édition du UserProfil
  updateMode: boolean = false;
  isValid: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private subscribeService: SubscribeService
  ) {}

  ngOnInit() {
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
    this.userService.isLog$.next(false);
    sessionStorage.clear();
  }

  onUserDelete() {
    this.userService.deleteUser(this.user.pseudo).subscribe({
      next: (response) => {
        this.router.navigate(['/account']); //recharge la page actuelle;
        sessionStorage.clear();
        this.userService.isLog$.next(false);
      },
      error: (error) => {
        //à definir;
      },
    });
  }

  onUserUpdate() {
    this.updateMode = !this.updateMode;
  }

  onUserUpdateSubmit() {
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.updateMode = false;
      },
      error: (error) => {
        this.isValid=false
      },
    });
  }

  onSubscribeDelete(subscribe_id: number) {
    this.subscribeService.deleteSubscribe(subscribe_id).subscribe({
      next: (response) => {
        this.subscribeService.getSubscriptionUser().subscribe({
          next: (subscriptions) => {
            this.userSubscriptions = subscriptions;
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
