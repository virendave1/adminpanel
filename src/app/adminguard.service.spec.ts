import { TestBed } from '@angular/core/testing';

import { AdminGuardService } from './adminguard.service';
describe('AdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AdminGuardService]
  }));

  it('should be created', () => {
    const service: AdminGuardService = TestBed.get(AdminGuardService);
    expect(service).toBeTruthy();
  });
});
function beforeEach(arg0: () => import("@angular/core/testing").TestBedStatic) {
  throw new Error('Function not implemented.');
}