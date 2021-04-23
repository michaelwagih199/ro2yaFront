import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsCycleComponent } from './patients-cycle.component';

describe('PatientsCycleComponent', () => {
  let component: PatientsCycleComponent;
  let fixture: ComponentFixture<PatientsCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
