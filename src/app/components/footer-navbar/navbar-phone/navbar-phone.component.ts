import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-phone',
  templateUrl: './navbar-phone.component.html',
  styleUrls: ['./navbar-phone.component.css'],
})
export class NavbarPhoneComponent {
  @Input() warningChecked!: boolean; 
  
  ngOnInit() {
    console.log(this.warningChecked); 
  }
}
