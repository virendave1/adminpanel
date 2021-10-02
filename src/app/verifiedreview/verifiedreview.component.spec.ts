import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedreviewComponent } from './verifiedreview.component';

describe('VerifiedreviewComponent', () => {
  let component: VerifiedreviewComponent;
  let fixture: ComponentFixture<VerifiedreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
