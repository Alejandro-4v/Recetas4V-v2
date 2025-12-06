import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRatingForm } from './new-rating-form';

describe('NewRatingForm', () => {
  let component: NewRatingForm;
  let fixture: ComponentFixture<NewRatingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRatingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRatingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
