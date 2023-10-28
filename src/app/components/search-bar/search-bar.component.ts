import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchFilter = new EventEmitter<string>();
  locationsList!: Location[];
  filteredLocations: Location[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe((locations) => {
      this.locationsList = [...locations];
      console.log(this.locationsList);
    });
  }

  onSearch(value: string) {
    console.log(value);
    this.filteredLocations = this.locationsList.filter((e) =>
      e.zip_code.includes(value)
    );
    console.log(this.filteredLocations);
  }
}
