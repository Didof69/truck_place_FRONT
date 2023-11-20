import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreatedOpinion } from 'src/app/models/created-opinion';
import { Location } from 'src/app/models/location';
import { Opinion } from 'src/app/models/opinion';
import { OpinionByMember } from 'src/app/models/opinion-by-member';
import { Parking } from 'src/app/models/parking';
import { User } from 'src/app/models/user';
import { OpinionService } from 'src/app/services/opinion.service';
import { ParkingService } from 'src/app/services/parking.service';
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
  noteTab: number[] = [1, 2, 3, 4, 5];
  opinion: CreatedOpinion = {
    opinion: '',
    note: 0,
    user_id: 0,
    parking_id: 0,
  };

  constructor(
    private opinionService: OpinionService,
    private router: Router,
    private messageService: MessageService,
    private parkingService: ParkingService
  ) {}

  onSubmit() {
    this.opinion.user_id = this.user.user_id;
    this.opinion.parking_id = this.parking.parking_id;
    this.opinion.note = +this.opinion.note;
    this.opinionService.createOpinion(this.opinion).subscribe({
      next: (response) => {
        this.getOpinionsMembers();
        this.messageService.add({
          severity: 'success',
          summary: 'Avis',
          detail: 'Votre avis est déposé.',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Avis',
          detail: 'Une erreur est survenue.',
        });
      },
    });
  }

  //obtenir la moyenne d'un parking
  getAverageParking(opinionsTab: Opinion[]): number {
    const allNote: number[] = [];
    for (let i = 0; i < opinionsTab.length; i++) {
      allNote.push(opinionsTab[i].note);
    }
    const averageParking = Math.round(
      allNote.reduce((bcc, v) => bcc + v) / allNote.length
    );
    return averageParking;
  }

  //récuperer le tableau des opinions pour le parking
  getOpinionsMembers() {
    this.parkingService
      .getOpinionsByParkingId(this.parking.parking_id)
      .subscribe((opinions) => {
        const opinionsTab = [...opinions];
        this.parkingService.numberOpinions$.next(opinionsTab.length);
        if (opinionsTab.length > 0) {
          this.parkingService.averageParking$.next(
            this.getAverageParking(opinionsTab)
          );
        }

        //parametrer les avis à afficher pour un parking
        const opinionsFullTab = [...opinions];
        const opinionsMembersTab = [];
        for (let i = 0; i < opinionsFullTab.length; i++) {
          const opinion = {
            pseudo: opinionsFullTab[i].user.pseudo,
            opinion: opinionsFullTab[i].opinion,
            note: opinionsFullTab[i].note,
          };
          opinionsMembersTab.push(opinion);
        }
        this.parkingService.opinionsMembersTab$.next(opinionsMembersTab);
      });
  }
}
