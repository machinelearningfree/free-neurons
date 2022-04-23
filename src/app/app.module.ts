import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { MultilayerPerceptronComponent } from './multilayer-perceptron/multilayer-perceptron.component';
import { LinearRegressionComponent } from './linear-regression/linear-regression.component';
import { BinaryClassificationComponent } from './binary-classification/binary-classification.component';
import { BinaryClassificationLearnComponent } from './binary-classification/binary-classification-learn/binary-classification-learn.component';
import { MultilayerPerceptronLearnComponent } from './multilayer-perceptron/multilayer-perceptron-learn/multilayer-perceptron-learn.component';
import { MultilayerPerceptronTrainingComponent } from './multilayer-perceptron/multilayer-perceptron-training/multilayer-perceptron-training.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AboutComponent,
    MultilayerPerceptronComponent,
    LinearRegressionComponent,
    BinaryClassificationComponent,
    BinaryClassificationLearnComponent,
    MultilayerPerceptronLearnComponent,
    MultilayerPerceptronTrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
