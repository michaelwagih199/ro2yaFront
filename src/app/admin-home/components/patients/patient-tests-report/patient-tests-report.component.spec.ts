import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTestsReportComponent } from './patient-tests-report.component';

describe('PatientTestsReportComponent', () => {
  let component: PatientTestsReportComponent;
  let fixture: ComponentFixture<PatientTestsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTestsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTestsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
