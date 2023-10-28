import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParkingModalComponent } from './update-parking-modal.component';

describe('UpdateParkingModalComponent', () => {
  let component: UpdateParkingModalComponent;
  let fixture: ComponentFixture<UpdateParkingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateParkingModalComponent]
    });
    fixture = TestBed.createComponent(UpdateParkingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
