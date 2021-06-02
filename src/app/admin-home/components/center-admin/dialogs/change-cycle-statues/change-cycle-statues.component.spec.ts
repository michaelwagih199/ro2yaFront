import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCycleStatuesComponent } from './change-cycle-statues.component';

describe('ChangeCycleStatuesComponent', () => {
  let component: ChangeCycleStatuesComponent;
  let fixture: ComponentFixture<ChangeCycleStatuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCycleStatuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCycleStatuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
