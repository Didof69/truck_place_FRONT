import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from 'src/app/models/location';
import { Parking } from 'src/app/models/parking';
import { Service } from 'src/app/models/service';
import { ParkingService } from 'src/app/services/parking.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-update-parking-modal',
  templateUrl: './update-parking-modal.component.html',
  styleUrls: ['./update-parking-modal.component.css'],
})
export class UpdateParkingModalComponent {
  @Input() parking!: Parking;
  @Input() location!: Location;
  @Input() reliabilityStatus!: string;
  @Input() numberOpinions!: number;
  @Input() averageParking!: number;

  isValid: Boolean = true;
  isNegative: Boolean = false;

  //initialise le tableau des id des services déjà cochés
  parkingServicesAlreadyChecked: number[] = [];

  servicesTab: Service[] = [];
  checkedServices: Service[] = [];
  checkedIdServices: number[] = [];

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private parkingService: ParkingService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.serviceService.getAllService().subscribe({
      next: (services) => {
        this.servicesTab = services;

        //récupère les id des services déjà cochés
        for (let i = 0; i < this.parking.services.length; i++) {
          this.parkingServicesAlreadyChecked.push(
            this.parking.services[i].service_id
          );
        }
        this.checkedIdServices = this.parkingServicesAlreadyChecked;
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

  onSubmit() {
    this.checkedServices = []
    for (let i = 0; i < this.checkedIdServices.length; i++) {
      this.checkedServices.push(
        this.servicesTab[this.checkedIdServices[i] - 1]
      );
    }

    this.parking.services = this.checkedServices;  
    this.parking.registration_date = new Date();

    if (this.parking.nb_space_free <= this.parking.nb_space_all) {
      this.parkingService.updateParking(this.parking).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Modification du parking',
            detail: 'Le parking a bien été modifié.',
          });          
          this.parkingService.parking$.next(response);          
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Modification du parking',
            detail: 'Une erreur est survenue.',
          });
          this.isNegative = true;
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Modification du parking',
        detail: 'Une erreur est survenue.',
      });
      this.isValid = false;
    }
  }

  returnMap() {
    this.router.navigate(['/map']);
  }

  onChangeService(e: Event): Number[] {
    const target = e.target as HTMLInputElement;
    const serviceChecked = JSON.parse(target.value);

    // Ajouter le service au tableau si on coche la checkbox
    // Enlever le service du tableau si on décoche la checkbox
    if (target.checked) {
      if (this.checkedIdServices.length === this.servicesTab.length) {
        this.checkedIdServices = [];
        this.checkedIdServices.push(serviceChecked.service_id);
      } else {
        this.checkedIdServices.push(serviceChecked.service_id);
      }
    } else {
      if (this.checkedIdServices.includes(serviceChecked.service_id)) {
        this.checkedIdServices = this.checkedIdServices.filter(
          (e) => e != serviceChecked.service_id
        );
      } else {
        this.checkedIdServices.push(serviceChecked.service_id);
      }
    }
    return this.checkedIdServices;
  }
}
