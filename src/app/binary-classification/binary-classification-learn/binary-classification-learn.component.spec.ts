import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryClassificationLearnComponent } from './binary-classification-learn.component';

describe('BinaryClassificationLearnComponent', () => {
  let component: BinaryClassificationLearnComponent;
  let fixture: ComponentFixture<BinaryClassificationLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryClassificationLearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryClassificationLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
