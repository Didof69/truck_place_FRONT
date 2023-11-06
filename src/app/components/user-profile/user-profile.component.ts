import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Parking } from 'src/app/models/parking';
import { User } from 'src/app/models/user';
import { ParkingService } from 'src/app/services/parking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() user!: User
  parkingsLiked!: Parking[];
  
  constructor(private parkingService :ParkingService, private userService:UserService, private router:Router) { };
  
  ngOnInit() {
    this.parkingService.getParkingsLikedByUser().subscribe((parkings) => this.parkingsLiked = parkings);
    
  }

  onDelete() {
    this.userService.deleteUser(this.user.pseudo).subscribe({
      next: (response) => {
        this.router.navigate(['/account']); //recharge la page actuelle;
        sessionStorage.clear()
        this.userService.isLog$.next(false);
      },
      error: (error) => {
        //à definir;
      },
    });
  }
}
