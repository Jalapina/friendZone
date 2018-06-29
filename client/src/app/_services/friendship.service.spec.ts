import { TestBed, inject } from '@angular/core/testing';

import { FriendshipService } from './friendship.service';

describe('FriendshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendshipService]
    });
  });

  it('should be created', inject([FriendshipService], (service: FriendshipService) => {
    expect(service).toBeTruthy();
  }));
});
