import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersSettingComponent } from './centers-setting.component';

describe('CentersSettingComponent', () => {
  let component: CentersSettingComponent;
  let fixture: ComponentFixture<CentersSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentersSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentersSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
