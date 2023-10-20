import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrls: ['./page-account.component.css'],
})
export class PageAccountComponent {
  user!: User;
  display: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.subUser$ = this.utilisateurService.getProfilUtilisateur(); //à creuser
    this.userService.getUserByPseudo().subscribe({
      next: (response) => {
        this.display = true; //modifie le composant à afficher
        this.user = response;
      },
      
      error: (error) => {
        this.display = true; //modifie le composant à afficher
      },
    });
  }
}
