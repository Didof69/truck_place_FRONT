import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  usersTabFilter: User[] = [];
  parkingsTab!: Parking[];
  parkingsTabFilter: Parking[] = [];

  isUserClicked: boolean = false;
  isParkingClicked: boolean = false;

  constructor(
    private userService: UserService,
    private parkingService: ParkingService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.parkingService.getAllParkings().subscribe({
      next: (parkings) => {
        this.parkingsTab = parkings;
        this.parkingsTabFilter = [...this.parkingsTab];
        this.sortParkingsTab(this.parkingsTabFilter);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Chargement des données',
          detail: 'Une erreur est survenue.',
        });
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        users.forEach((user) => {
          const userKO = 'anonyme';
          if (!user.user_name.includes(userKO)) {
            this.usersTab.push(user);
          }
        });
        this.usersTabFilter = [...this.usersTab];
        this.sortUsersTab(this.usersTabFilter);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Chargement des données',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }

  //permet de trier par ordre alpha tableau User
  sortUsersTab(tab: User[]) {
    tab.sort((a, b) => {
      const pseudoA = a.pseudo.toLowerCase();
      const pseudoB = b.pseudo.toLowerCase();

      if (pseudoA < pseudoB) {
        return -1;
      } else if (pseudoA > pseudoB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  //permet de trier par ordre croissant tableau Parking
  sortParkingsTab(tab: Parking[]) {
    tab.sort((a, b) => {
      const parking_idA = a.parking_id;
      const parking_idB = b.parking_id;

      if (parking_idA < parking_idB) {
        return -1;
      } else if (parking_idA > parking_idB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  onSearchUser(value: string) {
    this.usersTabFilter = this.usersTab.filter((e) =>
      e.pseudo.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    this.sortUsersTab(this.usersTabFilter);
  }

  onSearchParking(value: string) {
    this.parkingsTabFilter = this.parkingsTab.filter((e) =>
      e.parking_id
        .toString()
        .toLocaleLowerCase()
        .startsWith(value.toLocaleLowerCase())
    );
    this.sortParkingsTab(this.parkingsTabFilter);
  }

  onUserDelete(pseudo: string) {
    this.userService.deleteUser(pseudo).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression du profil',
          detail: `Le profil de ${pseudo} a été supprimé.`,
        });
        this.userService.getAllUsers().subscribe({
          next: (users) => {
            this.usersTab = [];
            users.forEach((user) => {
              const userKO = 'anonyme';
              if (!user.user_name.includes(userKO)) {
                this.usersTab.push(user);
              }
            });
            this.usersTabFilter = [...this.usersTab];
            this.sortUsersTab(this.usersTabFilter);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Chargement des données',
              detail: 'Une erreur est survenue.',
            });
          },
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Suppression du profil',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }

  onParkingDelete(parking_id: number) {
    this.parkingService.deleteParking(parking_id).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression du parking',
          detail: `Le parkind #${parking_id} a été supprimé.`,
        });
        this.parkingService.getAllParkings().subscribe({
          next: (parkings) => {
            this.parkingsTab = parkings;
            this.parkingsTabFilter = [...this.parkingsTab];
            this.sortParkingsTab(this.parkingsTabFilter);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Chargement des données',
              detail: 'Une erreur est survenue.',
            });
          },
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Suppression du parking',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }
}
