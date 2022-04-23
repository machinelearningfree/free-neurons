import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinaryClassificationLearnComponent } from './binary-classification-learn/binary-classification-learn.component';
import { BinaryClassificationTrainingComponent } from './binary-classification-training/binary-classification-training.component';

@NgModule({
  declarations: [
    BinaryClassificationLearnComponent,
    BinaryClassificationTrainingComponent,
  ],
  imports: [CommonModule],
})
export class BinaryClassificationModule {}
