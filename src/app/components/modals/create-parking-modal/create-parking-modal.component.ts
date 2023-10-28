import { Component } from '@angular/core';
import { CreatedParking } from 'src/app/models/created-parking';
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
  isNegative: Boolean = false;

  createdParking: CreatedParking = {
      parking_name: "",
  latitude: "",
  longitude: "",
  nb_space_all: 0,
  nb_space_free: 0,
  registration_date: new Date(),
  public_view: true,
  main_road: "",
  direction: "",
  insee_code: "",
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
    private userService:UserService,
  ) {}

  ngOnInit() {
    this.serviceService.getAllService().subscribe((services) => {
      this.servicesTab = services;
      console.log('dans on init createParking', this.servicesTab);
    });

    this.userService.getUserByPseudo().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
  }

  onSubmit() {
    this.createdParking.user_id = this.user.user_id;

    for (let i = 0; i < this.checkedIdServices.length; i++) {
      this.checkedServices.push(
        this.servicesTab[this.checkedIdServices[i] - 1]
      );
    }

    this.createdParking.services = this.checkedServices;
    // console.log(this.createdParking);
    if (this.createdParking.nb_space_all < 0) {
         this.isNegative = true;
    }

    if (this.createdParking.nb_space_free <= this.createdParking.nb_space_all) {
      // this.parkingService.updateParking(this.createdParking).subscribe({
      //   next: (response) => {
      //     location.reload();
      //   },
      //   error: (error) => {
      //     this.isNegative = true;
      //   },
      // });
    } else {
      this.isValid = false;
    }

    console.log(this.createdParking);
    
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
