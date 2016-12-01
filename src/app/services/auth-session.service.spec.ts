/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthsessionService } from './auth-session.service';

describe('SessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthsessionService]
    });
  });

  it('should ...', inject([AuthsessionService], (service: AuthsessionService) => {
    expect(service).toBeTruthy();
  }));
});