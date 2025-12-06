import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingView } from './rating-view';

describe('RatingView', () => {
  let component: RatingView;
  let fixture: ComponentFixture<RatingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
