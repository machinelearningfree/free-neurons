import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilayerPerceptronLearnComponent } from './multilayer-perceptron-learn.component';

describe('MultilayerPerceptronLearnComponent', () => {
  let component: MultilayerPerceptronLearnComponent;
  let fixture: ComponentFixture<MultilayerPerceptronLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultilayerPerceptronLearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilayerPerceptronLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
