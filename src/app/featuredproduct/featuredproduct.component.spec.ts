import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedproductComponent } from './featuredproduct.component';

describe('FeaturedproductComponent', () => {
  let component: FeaturedproductComponent;
  let fixture: ComponentFixture<FeaturedproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
