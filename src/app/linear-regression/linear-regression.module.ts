import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { LinearRegressionLearnComponent } from './linear-regression-learn/linear-regression-learn.component';
import { LinearRegressionTrainingComponent } from './linear-regression-training/linear-regression-training.component';
import { LinearRegressionComponent } from './linear-regression.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LinearRegressionLearnComponent,
    LinearRegressionTrainingComponent,
    LinearRegressionComponent,
  ],
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule],
})
export class LinearRegressionModule {}
