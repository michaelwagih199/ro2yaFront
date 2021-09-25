import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPvComponent } from './patient-pv.component';

describe('PatientPvComponent', () => {
  let component: PatientPvComponent;
  let fixture: ComponentFixture<PatientPvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
