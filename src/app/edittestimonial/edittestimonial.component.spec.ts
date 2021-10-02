import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittestimonialComponent } from './edittestimonial.component';

describe('EdittestimonialComponent', () => {
  let component: EdittestimonialComponent;
  let fixture: ComponentFixture<EdittestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
