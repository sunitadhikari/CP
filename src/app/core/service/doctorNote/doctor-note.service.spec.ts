import { TestBed } from '@angular/core/testing';

import { DoctorNoteService } from './doctor-note.service';

describe('DoctorNoteService', () => {
  let service: DoctorNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
