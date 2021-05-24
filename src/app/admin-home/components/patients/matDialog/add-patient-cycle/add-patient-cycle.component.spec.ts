import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientCycleComponent } from './add-patient-cycle.component';

describe('AddPatientCycleComponent', () => {
  let component: AddPatientCycleComponent;
  let fixture: ComponentFixture<AddPatientCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
