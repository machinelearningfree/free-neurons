import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearRegressionTrainingComponent } from './linear-regression-training.component';

describe('LinearRegressionTrainingComponent', () => {
  let component: LinearRegressionTrainingComponent;
  let fixture: ComponentFixture<LinearRegressionTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearRegressionTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearRegressionTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
