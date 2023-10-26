import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpinionByMember } from 'src/app/models/opinion-by-member';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css'],
})
export class OpinionComponent {
  opinionsTab: OpinionByMember[] = [];

  constructor(
    private parkingService: ParkingService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const parkingIdFromRoute = Number(routeParam.get('id'));

    this.parkingService.getOpinionsByParkingId(parkingIdFromRoute)
      .subscribe((opinions) => {
        const opinionsFullTab = [...opinions];
        for (let i = 0; i < opinionsFullTab.length; i++) {
          const opinion = {
            pseudo: opinionsFullTab[i].user.pseudo,
            opinion: opinionsFullTab[i].opinion,
            note: opinionsFullTab[i].note,
          }
          console.log(opinion);
          this.opinionsTab.push(opinion)
        }
        console.log(this.opinionsTab);
      });
  }

}
