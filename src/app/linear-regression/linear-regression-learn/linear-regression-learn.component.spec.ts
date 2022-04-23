import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearRegressionLearnComponent } from './linear-regression-learn.component';

describe('LinearRegressionLearnComponent', () => {
  let component: LinearRegressionLearnComponent;
  let fixture: ComponentFixture<LinearRegressionLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearRegressionLearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearRegressionLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
