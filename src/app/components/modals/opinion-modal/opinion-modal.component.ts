import { Component, Input } from '@angular/core';
import { OpinionByMember } from 'src/app/models/opinion-by-member';
import { Parking } from 'src/app/models/parking';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-opinion-modal',
  templateUrl: './opinion-modal.component.html',
  styleUrls: ['./opinion-modal.component.css'],
})
export class OpinionModalComponent {
  @Input() opinionsMembersTab!: OpinionByMember[];
  @Input() parking!: Parking;
  @Input() location!: Location;
}
