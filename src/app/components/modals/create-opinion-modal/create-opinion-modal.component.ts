import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreatedOpinion } from 'src/app/models/created-opinion';
import { Location } from 'src/app/models/location';
import { OpinionByMember } from 'src/app/models/opinion-by-member';
import { Parking } from 'src/app/models/parking';
import { User } from 'src/app/models/user';
import { OpinionService } from 'src/app/services/opinion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-opinion-modal',
  templateUrl: './create-opinion-modal.component.html',
  styleUrls: ['./create-opinion-modal.component.css'],
})
export class CreateOpinionModalComponent {
  @Input() opinionsMembersTab!: OpinionByMember[];
  @Input() parking!: Parking;
  @Input() location!: Location;
  @Input() user!: User;
  noteTab:number[] =[1,2,3,4,5]
  opinion: CreatedOpinion = {
    opinion: '',
    note: 0,
    user_id: 0,
    parking_id: 0,
  };

  constructor(
    private userService: UserService,
    private opinionService: OpinionService
  ) {}

  onSubmit() {
    this.opinion.user_id = this.user.user_id;
    this.opinion.parking_id = this.parking.parking_id;
    this.opinion.note = +this.opinion.note
    this.opinionService.createOpinion(this.opinion).subscribe({
      next: (response) => {
        location.reload();
      },
      error: (error) => {},
    });
  }
}
