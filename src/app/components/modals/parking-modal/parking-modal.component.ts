import { Component, Input } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-parking-modal',
  templateUrl: './parking-modal.component.html',
  styleUrls: ['./parking-modal.component.css'],
})
export class ParkingModalComponent {
  @Input() parking!: Parking;
  @Input() location!: Location;
  @Input() reliabilityStatus!: string;
  @Input() numberOpinions!: number;
  @Input() averageParking!: number;
  @Input() user!: User;

  
  constructor(private router: Router) {}

  ngOnInit() {}
  returnMap() {
    this.router.navigate(['/map']);
  }
}
