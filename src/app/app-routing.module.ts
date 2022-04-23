import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinaryClassificationComponent } from './binary-classification/binary-classification.component';
import { LinearRegressionComponent } from './linear-regression/linear-regression.component';
import { MainComponent } from './main/main.component';
import { MultilayerPerceptronComponent } from './multilayer-perceptron/multilayer-perceptron.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'linear-regression', component: LinearRegressionComponent },
  { path: 'mlp', component: MultilayerPerceptronComponent },
  { path: 'binary-classification', component: BinaryClassificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
