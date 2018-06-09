import { TestBed, inject } from '@angular/core/testing';

import { GuardAuthenticationService } from './guard-authentication.service';

describe('GuardAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardAuthenticationService]
    });
  });

  it('should be created', inject([GuardAuthenticationService], (service: GuardAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
