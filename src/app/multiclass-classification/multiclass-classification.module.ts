import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MulticlassClassificationComponent } from './multiclass-classification.component';
import { MulticlassClassificationTrainingComponent } from './multiclass-classification-training/multiclass-classification-training.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MulticlassClassificationComponent,
    MulticlassClassificationTrainingComponent,
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
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
})
export class MulticlassClassificationModule {}
