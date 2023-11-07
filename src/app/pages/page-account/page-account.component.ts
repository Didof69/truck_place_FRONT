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
  isLog!: boolean;
  display: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLog$.subscribe((resp) => {
      this.isLog = resp;
      if (this.isLog) {
      this.userService.getUserByPseudo().subscribe({
      next: (response) => {
          this.user = response;
          console.log("user",this.user.likedParkings);
          
      },
        error: (error) => {
        //géréer l'erreur
      },
    });
    }
    });

    
  }
}
