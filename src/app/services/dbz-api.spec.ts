import { TestBed } from '@angular/core/testing';

import { DbzApi } from './dbz-api';

describe('DbzApi', () => {
  let service: DbzApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbzApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
