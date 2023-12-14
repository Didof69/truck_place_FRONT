import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningModalComponent } from './warning-modal.component';

describe('WarningModalComponent', () => {
  let component: WarningModalComponent;
  let fixture: ComponentFixture<WarningModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningModalComponent]
    });
    fixture = TestBed.createComponent(WarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
