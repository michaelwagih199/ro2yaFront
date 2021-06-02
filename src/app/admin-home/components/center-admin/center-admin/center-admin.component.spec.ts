import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAdminComponent } from './center-admin.component';

describe('CenterAdminComponent', () => {
  let component: CenterAdminComponent;
  let fixture: ComponentFixture<CenterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
