import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parking } from 'src/app/models/parking';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {
  parking!: Parking;

  constructor(
    private parkingService: ParkingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const parkingIdFromRoute = Number(routeParam.get('id'));
    this.parkingService.getParkingById(parkingIdFromRoute).subscribe((parking) => {
      console.log(parking);  

      
    });
  }
}
