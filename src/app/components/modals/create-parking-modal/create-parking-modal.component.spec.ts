import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingModalComponent } from './create-parking-modal.component';

describe('CreateParkingModalComponent', () => {
  let component: CreateParkingModalComponent;
  let fixture: ComponentFixture<CreateParkingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateParkingModalComponent]
    });
    fixture = TestBed.createComponent(CreateParkingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
