import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css'],
})
export class WarningModalComponent {
  @Output() warningEvent = new EventEmitter<boolean>();
  
  onAcceptWarn() {
    this.warningEvent.emit(true);
  }
}
