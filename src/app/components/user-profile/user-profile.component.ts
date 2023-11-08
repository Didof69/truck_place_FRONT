import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscribe } from 'src/app/models/subscribe';
import { UpdatedUser } from 'src/app/models/updated-user';
import { User } from 'src/app/models/user';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges {
  @Input() user!: User;
  userSubscriptions: Subscribe[] = [];

  updatedUser: UpdatedUser = {
    user_id: 0,
    pseudo: '',
    user_name: '',
    firstname: '',
    email: '',
  };

  //paramètre pour gérer l'édition du UserProfil
  updateMode: boolean = false;

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

  ngOnChanges() {
    if (this.user) {
      this.updatedUser = {
        user_id: this.user.user_id,
        pseudo: this.user.pseudo,
        user_name: this.user.user_name,
        firstname: this.user.firstname,
        email: this.user.email,
      };
    }
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

  onUserSubmit() {
    this.updatedUser.user_id = this.user.user_id;
    this.userService
      .updateUser(this.updatedUser)
      .subscribe((response) => console.log(response));
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
