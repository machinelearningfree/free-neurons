import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryClassificationTrainingComponent } from './binary-classification-training.component';

describe('BinaryClassificationTrainingComponent', () => {
  let component: BinaryClassificationTrainingComponent;
  let fixture: ComponentFixture<BinaryClassificationTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryClassificationTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryClassificationTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
