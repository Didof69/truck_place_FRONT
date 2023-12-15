import { Component } from '@angular/core';
import { UserService } from './services/user.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'truck_place_front';
  warningChecked!: boolean;

  constructor(private userService : UserService) {}

  ngOnInit() {
    this.userService.warningChecked$.subscribe((data) => (this.warningChecked = data));
   }
}
