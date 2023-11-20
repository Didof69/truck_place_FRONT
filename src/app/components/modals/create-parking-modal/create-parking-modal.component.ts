import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreatedParking } from 'src/app/models/created-parking';
import { Location } from 'src/app/models/location';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ParkingService } from 'src/app/services/parking.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-parking-modal',
  templateUrl: './create-parking-modal.component.html',
  styleUrls: ['./create-parking-modal.component.css'],
})
export class CreateParkingModalComponent {
  isValid: Boolean = true;
  isNbAllNegative: Boolean = false;
  isNbFreeNegative: Boolean = false;
  isCityValid: Boolean = true;

  createdParking: CreatedParking = {
    parking_name: '',
    latitude: '',
    longitude: '',
    nb_space_all: 1,
    nb_space_free: 0,
    registration_date: new Date(),
    public_view: true,
    main_road: '',
    direction: '',
    insee_code: '',
    user_id: 0,
    services: [],
  };

  user!: User;
  servicesTab: Service[] = [];
  checkedServices: Service[] = [];
  checkedIdServices: number[] = [];

  constructor(
    private serviceService: ServiceService,
    private parkingService: ParkingService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.createdParking.latitude = position.coords.latitude.toString();
        this.createdParking.longitude = position.coords.longitude.toString();
      });
    }

    this.serviceService.getAllService().subscribe((services) => {
      this.servicesTab = services;
    });

    this.userService.getUserByPseudo().subscribe((user) => {
      this.user = user;
      //gérer l'erreur qui renvoie vers le login
    });
  }

  onSubmit() {
    this.createdParking.user_id = this.user.user_id;

    for (let i = 0; i < this.checkedIdServices.length; i++) {
      this.checkedServices.push(
        this.servicesTab[this.checkedIdServices[i] - 1]
      );
    }

    this.createdParking.services = this.checkedServices;

    if (this.createdParking.nb_space_all > 0) {
      if (this.createdParking.nb_space_free < 0) {
        this.isNbFreeNegative = true;
      } else if (
        this.createdParking.nb_space_free <= this.createdParking.nb_space_all
      ) {
        this.parkingService.createParking(this.createdParking).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Création de parking',
              detail: 'Parking ajouté avec succès',
            });
            setTimeout(() => {
              this.router.navigate(['/map/parking/', response.parking_id]);
            }, 2000);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Création de parking',
              detail: 'Une erreur est survenue.',
            });
            this.isCityValid = false;
          },
        });
      } else {
        this.isValid = false;
      }
    } else {
      this.isNbAllNegative = true;
    }
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

  onValidateLocation(location: Location) {
    this.createdParking.insee_code = location.insee_code;
  }
}
