import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParkingModalComponent } from './delete-parking-modal.component';

describe('DeleteParkingModalComponent', () => {
  let component: DeleteParkingModalComponent;
  let fixture: ComponentFixture<DeleteParkingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteParkingModalComponent]
    });
    fixture = TestBed.createComponent(DeleteParkingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
