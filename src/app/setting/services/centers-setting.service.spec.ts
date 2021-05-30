import { TestBed } from '@angular/core/testing';

import { CentersSettingService } from './centers-setting.service';

describe('CentersSettingService', () => {
  let service: CentersSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentersSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
