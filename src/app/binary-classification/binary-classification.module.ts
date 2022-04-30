import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BinaryClassificationLearnComponent } from './binary-classification-learn/binary-classification-learn.component';
import { BinaryClassificationTrainingComponent } from './binary-classification-training/binary-classification-training.component';
import { BinaryClassificationComponent } from './binary-classification.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    BinaryClassificationLearnComponent,
    BinaryClassificationTrainingComponent,
    BinaryClassificationComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
})
export class BinaryClassificationModule {}
