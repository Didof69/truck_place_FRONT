import { Component } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { User } from 'src/app/models/user';
import { ParkingService } from 'src/app/services/parking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageAdminComponent {
  usersTab: User[] = [];
  parkingsTab!: Parking[];

  isUserClicked: boolean = false;
  isParkingClicked: boolean = false;

  constructor(
    private userService: UserService,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.parkingService.getAllParkings().subscribe({
      next: (parkings) => (this.parkingsTab = parkings),
      error: (error) => {
        //gérer les erreurs
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        users.forEach(user => {
          const userKO = "anonyme"
          if (!(user.user_name.includes(userKO))) {
            this.usersTab.push(user)
          }
        });
      },
      error: (error) => {
        //gérer les erreurs
      },
    });
  }

  onUserDelete(pseudo: string) {
    this.userService.deleteUser(pseudo).subscribe({
      next: (response) => {
        this.userService.getAllUsers().subscribe({
          next: (users) => {
            this.usersTab = []
            users.forEach((user) => {
              const userKO = 'anonyme';
              if (!user.user_name.includes(userKO)) {
                this.usersTab.push(user);
              }
            });
          },
          error: (error) => {
            //gérer les erreurs
          },
        });
      },
      error: (error) => {
        //gérer l'erreur
      },
    });
  }
  
  onParkingDelete(parking_id: number) {
        this.parkingService.deleteParking(parking_id).subscribe({
          next: (response) => {
                this.parkingService.getAllParkings().subscribe({
                  next: (parkings) => (this.parkingsTab = parkings),
                  error: (error) => {
                    //gérer les erreurs
                  },
                });
          },
          error: (error) => {
            //gérer l'erreur
          },
        });
  }
}
