import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  warningChecked!: boolean;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.userService.warningChecked$.subscribe((data)=>this.warningChecked=data);
  }
}
