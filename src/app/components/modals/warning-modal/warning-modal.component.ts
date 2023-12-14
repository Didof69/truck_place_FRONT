import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css'],
})
export class WarningModalComponent {
  // @Output() warningEvent = new EventEmitter<boolean>();
  
  constructor(private userService: UserService){}
  
  onAcceptWarn() {
    this.userService.warningChecked$.next(true)
  }
}
