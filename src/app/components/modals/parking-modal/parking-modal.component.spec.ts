import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingModalComponent } from './parking-modal.component';

describe('ParkingModalComponent', () => {
  let component: ParkingModalComponent;
  let fixture: ComponentFixture<ParkingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingModalComponent]
    });
    fixture = TestBed.createComponent(ParkingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
