import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Parking } from 'src/app/models/parking';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-delete-parking-modal',
  templateUrl: './delete-parking-modal.component.html',
  styleUrls: ['./delete-parking-modal.component.css'],
})
  
export class DeleteParkingModalComponent {
  @Input() parking!: Parking;
  constructor(
    private parkingService: ParkingService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onParkingDelete(parking_id: number) {
    this.parkingService.deleteParking(parking_id).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Suppresison de parking',
          detail: 'Le parking a été supprimé avec succès',
        });
        setTimeout(() => {
          this.router.navigate(['map']);
        }, 2000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Suppression de parking',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }
}
