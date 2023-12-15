import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar-phone',
  templateUrl: './navbar-phone.component.html',
  styleUrls: ['./navbar-phone.component.css'],
})
export class NavbarPhoneComponent {
  warningChecked!: boolean;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.userService.warningChecked$.subscribe(
      (data) => (this.warningChecked = data)
    );
  }
}
