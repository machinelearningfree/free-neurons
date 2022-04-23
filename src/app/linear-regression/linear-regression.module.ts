import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearRegressionLearnComponent } from './linear-regression-learn/linear-regression-learn.component';
import { LinearRegressionTrainingComponent } from './linear-regression-training/linear-regression-training.component';



@NgModule({
  declarations: [
    LinearRegressionLearnComponent,
    LinearRegressionTrainingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LinearRegressionModule { }
