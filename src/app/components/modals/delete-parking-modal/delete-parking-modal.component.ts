import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Parking } from 'src/app/models/parking';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-delete-parking-modal',
  templateUrl: './delete-parking-modal.component.html',
  styleUrls: ['./delete-parking-modal.component.css'],
})
export class DeleteParkingModalComponent {
  @Input() parking!: Parking;
  constructor(private parkingService: ParkingService, private router: Router) {}

  onParkingDelete(parking_id: number) {    
    this.parkingService.deleteParking(parking_id).subscribe({
      next: (response) => {
        console.log('supprimé');
        this.router.navigate(['map']);
      },
      error: (error) => {
        //gérer l'erreur
      },
    });
  }
}
