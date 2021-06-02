import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterLoginComponent } from './center-login.component';

describe('CenterLoginComponent', () => {
  let component: CenterLoginComponent;
  let fixture: ComponentFixture<CenterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
