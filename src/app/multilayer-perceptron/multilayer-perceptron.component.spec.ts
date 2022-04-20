import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilayerPerceptronComponent } from './multilayer-perceptron.component';

describe('MultilayerPerceptronComponent', () => {
  let component: MultilayerPerceptronComponent;
  let fixture: ComponentFixture<MultilayerPerceptronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultilayerPerceptronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilayerPerceptronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
