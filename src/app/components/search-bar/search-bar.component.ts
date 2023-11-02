import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() location = new EventEmitter<Location>();
  buttonClicked: boolean = false;

  locationsList!: Location[];
  filteredLocations: Location[] = [];
  locationValue: string = '';

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe((locations) => {
      this.locationsList = [...locations];
      // console.log(this.locationsList);
    });
  }

  //chercher par code postal commencant par la value
  onSearch(value: string) {
    // console.log(value);
    this.buttonClicked = false;
    this.filteredLocations = this.locationsList.filter((e) =>
      e.zip_code.startsWith(value)
    );
  }

  getSearchedLocation(location: Location) {
    // console.log('dans searchbar',location);
    this.buttonClicked = true;
    this.locationValue = `${location.zip_code} ${location.city_name}`;
    this.location.emit(location);
  }
}
