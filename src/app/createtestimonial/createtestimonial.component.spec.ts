import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetestimonialComponent } from './createtestimonial.component';

describe('CreatetestimonialComponent', () => {
  let component: CreatetestimonialComponent;
  let fixture: ComponentFixture<CreatetestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
