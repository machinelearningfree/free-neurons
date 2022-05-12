import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

import { LinearRegressionModule } from './linear-regression/linear-regression.module';
import { BinaryClassificationModule } from './binary-classification/binary-classification.module';
import { MulticlassClassificationModule } from './multiclass-classification/multiclass-classification.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LinearRegressionModule,
    BinaryClassificationModule,
    MulticlassClassificationModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
