import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipeForm } from './new-recipe-form';

describe('NewRecipeForm', () => {
  let component: NewRecipeForm;
  let fixture: ComponentFixture<NewRecipeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRecipeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
