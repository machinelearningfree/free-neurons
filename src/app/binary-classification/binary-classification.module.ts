import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BinaryClassificationLearnComponent } from './binary-classification-learn/binary-classification-learn.component';
import { BinaryClassificationTrainingComponent } from './binary-classification-training/binary-classification-training.component';
import { BinaryClassificationComponent } from './binary-classification.component';

@NgModule({
  declarations: [
    BinaryClassificationLearnComponent,
    BinaryClassificationTrainingComponent,
    BinaryClassificationComponent,
  ],
  imports: [CommonModule, MatTabsModule, MatIconModule],
})
export class BinaryClassificationModule {}
