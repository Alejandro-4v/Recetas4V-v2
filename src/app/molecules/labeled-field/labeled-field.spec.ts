import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledField } from './labeled-field';

describe('LabeledField', () => {
  let component: LabeledField;
  let fixture: ComponentFixture<LabeledField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabeledField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabeledField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
