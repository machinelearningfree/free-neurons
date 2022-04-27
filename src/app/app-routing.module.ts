import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinaryClassificationComponent } from './binary-classification/binary-classification.component';
import { LinearRegressionComponent } from './linear-regression/linear-regression.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'linear-regression', component: LinearRegressionComponent },
  { path: 'binary-classification', component: BinaryClassificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
