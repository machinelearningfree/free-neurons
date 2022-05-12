import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticlassClassificationTrainingComponent } from './multiclass-classification-training.component';

describe('MulticlassClassificationTrainingComponent', () => {
  let component: MulticlassClassificationTrainingComponent;
  let fixture: ComponentFixture<MulticlassClassificationTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulticlassClassificationTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticlassClassificationTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
