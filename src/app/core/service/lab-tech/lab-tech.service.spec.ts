import { TestBed } from '@angular/core/testing';

import { LabTechService } from './lab-tech.service';

describe('LabTechService', () => {
  let service: LabTechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabTechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
