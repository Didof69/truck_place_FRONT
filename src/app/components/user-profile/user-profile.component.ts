import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UpdatedUser } from 'src/app/models/updated-user';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges {
  @Input() user!: User;

  updatedUser: UpdatedUser = {
    user_id: 0,
    pseudo: "",
    user_name: "",
    firstname: "",
    email:"",
  };

  //paramètre pour gérer l'édition du UserProfil
  updateMode: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnChanges() {
    this.updatedUser = {
        user_id: this.user.user_id,
        pseudo: this.user.pseudo,
        user_name: this.user.user_name,
        firstname: this.user.firstname,
        email: this.user.email,
      };
  }

  onDelete() {
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

  onUpdate() {
    this.updateMode = !this.updateMode;
  }

  onSubmit() {
    this.updatedUser.user_id = this.user.user_id;
    this.userService.updateUser(this.updatedUser).subscribe((response)=>console.log(response))
  }
}