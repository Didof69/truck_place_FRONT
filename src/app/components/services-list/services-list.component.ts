import { Component, Input } from '@angular/core';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent {
@Input() services! :Service[]
}
