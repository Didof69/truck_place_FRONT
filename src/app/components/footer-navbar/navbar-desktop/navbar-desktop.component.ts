import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css'],
})
export class NavbarDesktopComponent {
  warningChecked!: boolean;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.userService.warningChecked$.subscribe(
      (data) => (this.warningChecked = data)
    );
  }
}
