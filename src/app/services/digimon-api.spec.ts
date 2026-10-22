import { TestBed } from '@angular/core/testing';

import { DigimonApi } from './digimon-api';

describe('DigimonApi', () => {
  let service: DigimonApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigimonApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
