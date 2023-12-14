import { Component } from '@angular/core';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent {
  onAcceptWarn() {
  sessionStorage.setItem('warningCheck', 'true')
}
}
