import { TestBed } from '@angular/core/testing';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './network.service';

describe('NetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ Network ],
  }));

  it('should be created', () => {
    const service: NetworkService = TestBed.get(NetworkService);
    expect(service).toBeTruthy();
  });
});
