import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientOvComponent } from './add-patient-ov.component';

describe('AddPatientOvComponent', () => {
  let component: AddPatientOvComponent;
  let fixture: ComponentFixture<AddPatientOvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientOvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientOvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
