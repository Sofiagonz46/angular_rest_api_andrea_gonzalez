import { TestBed } from '@angular/core/testing';

import { DemonSlayerApi } from './demon-slayer-api';

describe('DemonSlayerApi', () => {
  let service: DemonSlayerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonSlayerApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
