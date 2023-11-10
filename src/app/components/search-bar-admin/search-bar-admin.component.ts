import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-admin',
  templateUrl: './search-bar-admin.component.html',
  styleUrls: ['./search-bar-admin.component.css'],
})
export class SearchBarAdminComponent {
  @Output() searchFilter = new EventEmitter<string>();

  onSearch(value: string) {
    this.searchFilter.emit(value);
  }
}
