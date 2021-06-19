import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAdminReportsComponent } from './center-admin-reports.component';

describe('CenterAdminReportsComponent', () => {
  let component: CenterAdminReportsComponent;
  let fixture: ComponentFixture<CenterAdminReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterAdminReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
