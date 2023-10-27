import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionModalComponent } from './opinion-modal.component';

describe('OpinionModalComponent', () => {
  let component: OpinionModalComponent;
  let fixture: ComponentFixture<OpinionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpinionModalComponent]
    });
    fixture = TestBed.createComponent(OpinionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
