import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { PerceptronComponent } from './perceptron/perceptron.component';
import { MultilayerPerceptronComponent } from './multilayer-perceptron/multilayer-perceptron.component';
import { LinearRegressionComponent } from './linear-regression/linear-regression.component';
import { FeedForwardComponent } from './feed-forward/feed-forward.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AboutComponent,
    PerceptronComponent,
    MultilayerPerceptronComponent,
    LinearRegressionComponent,
    FeedForwardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
