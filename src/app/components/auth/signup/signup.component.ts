import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    password_confirm: '',
    admin: false,
    is_delete: false,
  };

  confirmMdpError = false;
  inscriptionOK = true;
  isFormSubmit = false;
  showPassword = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  signUp(inscriptionForm: NgForm) {
    this.isFormSubmit = true;

    // Verifier si les mots de passe correspondent
    this.confirmMdpError = this.user.password !== this.user.password_confirm;

    if (inscriptionForm.valid && !this.confirmMdpError) {
      // Si tous les champs sont valides, alors continuez avec l'inscription.
      this.userService.signUp(this.user).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Félicitations! Vous êtes inscrit(e)!',
            detail: 'Merci de vous connectez.',
          });
          setTimeout(() => {
            this.router.navigate(['/account']);
          }, 2000);
        },
        error: (error) => {
          this.inscriptionOK = false;
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
