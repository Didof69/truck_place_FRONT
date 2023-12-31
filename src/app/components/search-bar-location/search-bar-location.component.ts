import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-search-bar-location',
  templateUrl: './search-bar-location.component.html',
  styleUrls: ['./search-bar-location.component.css'],
})
  
export class SearchBarLocationComponent {
  @Output() location = new EventEmitter<Location>();
  
  buttonClicked: boolean = false;

  locationsList!: Location[];
  filteredLocations: Location[] = [];
  locationValue: string = '';

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe((locations) => {
      this.locationsList = [...locations];
    });
  }

  //chercher par code postal commencant par la value
  onSearch(value: string) {
    this.buttonClicked = false;
    this.filteredLocations = this.locationsList.filter((e) =>
      e.zip_code.startsWith(value)
    );
    this.sortLocationsTab(this.filteredLocations)
  }

  getSearchedLocation(location: Location) {
    this.buttonClicked = true;
    this.locationValue = `${location.zip_code} ${location.city_name}`;
    this.location.emit(location);
  }

  //permet de trier par ordre alpha tableau User
  sortLocationsTab(tab: Location[]) {
    tab.sort((a, b) => {
      const city_nameA = a.city_name.toLowerCase();
      const city_nameB = b.city_name.toLowerCase();

      if (city_nameA < city_nameB) {
        return -1;
      } else if (city_nameA > city_nameB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
