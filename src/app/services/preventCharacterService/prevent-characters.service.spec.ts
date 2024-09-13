import { TestBed } from '@angular/core/testing';

import { PreventCharactersService } from './prevent-characters.service';

describe('PreventCharactersService', () => {
  let service: PreventCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
