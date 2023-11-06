import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLikedCardComponent } from './parking-liked-card.component';

describe('ParkingLikedCardComponent', () => {
  let component: ParkingLikedCardComponent;
  let fixture: ComponentFixture<ParkingLikedCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingLikedCardComponent]
    });
    fixture = TestBed.createComponent(ParkingLikedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
