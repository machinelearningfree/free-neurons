import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultilayerPerceptronLearnComponent } from './multilayer-perceptron-learn/multilayer-perceptron-learn.component';
import { MultilayerPerceptronTrainingComponent } from './multilayer-perceptron-training/multilayer-perceptron-training.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MultilayerPerceptronLearnComponent,
    MultilayerPerceptronTrainingComponent,
  ],
})
export class MultilayerPerceptronModule {}
