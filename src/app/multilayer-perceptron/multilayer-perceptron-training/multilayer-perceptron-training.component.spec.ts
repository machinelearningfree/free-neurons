import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilayerPerceptronTrainingComponent } from './multilayer-perceptron-training.component';

describe('MultilayerPerceptronTrainingComponent', () => {
  let component: MultilayerPerceptronTrainingComponent;
  let fixture: ComponentFixture<MultilayerPerceptronTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultilayerPerceptronTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilayerPerceptronTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
