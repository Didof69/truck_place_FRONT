import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatedUser } from 'src/app/models/created-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: CreatedUser = {
    pseudo: '',
    user_name: '',
    firstname: '',
    email: '',
    password: '',
    password_confirm:'',
    admin: false,
  };

  confirmMdpError = false;
  inscriptionOK = true;
  isFormSubmit = false;

  constructor(private userService: UserService, private router: Router) {}

  signUp(inscriptionForm: NgForm) {
    this.isFormSubmit = true;

    // Verifier si les mots de passe correspondent
    this.confirmMdpError =
      this.user.password !== this.user.password_confirm;

    if (inscriptionForm.valid && !this.confirmMdpError) {
      // Si tous les champs sont valides, alors continuez avec l'inscription.
      this.userService
        .signUp(this.user)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/account']);
          },
          error: (error) => {
            this.inscriptionOK = false;
          },
        });
    }
  }
}
