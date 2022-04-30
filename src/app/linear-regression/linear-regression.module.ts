import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { LinearRegressionLearnComponent } from './linear-regression-learn/linear-regression-learn.component';
import { LinearRegressionTrainingComponent } from './linear-regression-training/linear-regression-training.component';
import { LinearRegressionComponent } from './linear-regression.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LinearRegressionLearnComponent,
    LinearRegressionTrainingComponent,
    LinearRegressionComponent,
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
export class LinearRegressionModule {}
