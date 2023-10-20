import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLog } from 'src/app/models/user-log';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: UserLog = {
    pseudo: '',
    password: '',
  };

  isFormValidate = false;
  connexionKO = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(connexionForm: NgForm) {
    this.isFormValidate = true;

    if (connexionForm.valid) {
      this.userService.login(this.user).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.accessToken);
          location.reload(); //recharge la page actuelle
        },
        error: (error) => {
          this.connexionKO = true;
        },
      });
    }
  }
}
