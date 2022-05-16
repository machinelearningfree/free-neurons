import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
import { Papa } from 'ngx-papaparse';
import { MLP } from './MLP';
import { SnackBarService } from '../../snack-bar/snack-bar.service';

@Component({
  selector: 'app-multiclass-classification-training',
  templateUrl: './multiclass-classification-training.component.html',
  styleUrls: ['./multiclass-classification-training.component.scss'],
  providers: [SnackBarService],
})
export class MulticlassClassificationTrainingComponent implements OnInit {
  @ViewChild('training', { static: true })
  training?: ElementRef;

  graphicTraining!: Chart;
  results: number[] = [];
  resultTraining: number[] = [];
  samples = '';
  dataOne: any = [];
  dataTwo: any = [];

  isloading = false;
  isloadingResult = false;

  formTraining = this.fb.group({
    x: ['', Validators.required],
    y: ['', Validators.required],
    z: ['', Validators.required],
    r: ['', Validators.required],
    epochs: ['', Validators.required],
    learningReating: ['', Validators.required],
    neurons: ['', Validators.required],
    file: ['', Validators.required],
  });

  formClassify = this.fb.group({
    epochs: ['', Validators.required],
    learningReating: ['', Validators.required],
    neurons: ['', Validators.required],
    x: ['', Validators.required],
    y: ['', Validators.required],
    z: ['', Validators.required],
    r: ['', Validators.required],
  });

  constructor(
    private papa: Papa,
    private fb: FormBuilder,
    private snack: SnackBarService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.graphicTraining = new Chart(this.training?.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: [],
            label: 'classe 0',
            backgroundColor: 'black',
          },
          {
            data: [],
            label: 'classe 1',
            backgroundColor: 'red',
          },
        ],
      },
    });
  }

  fileSelect(evt: any) {
    const files = evt.target.files[0];
    if (files) {
      const reader = new FileReader();
      reader.readAsText(files);
      reader.onload = (event: any) => {
        this.papa.parse(event.target.result, {
          skipEmptyLines: true,
          header: true,
          complete: (results) => {
            this.dataOne = results.data.map((d: any) => {
              return [
                parseFloat(d.x),
                parseFloat(d.y),
                parseFloat(d.z),
                parseFloat(d.r),
              ];
            });

            this.dataTwo = results.data.map((d: any) => {
              const splited = d.c.split(',');
              return [
                parseFloat(splited[0]),
                parseFloat(splited[1]),
                parseFloat(splited[2]),
              ];
            });

            if (
              results.errors.length ||
              this.dataOne.includes(NaN, undefined, null) ||
              this.dataTwo.includes(NaN, undefined, null) ||
              !this.dataOne.length ||
              !this.dataTwo.length ||
              this.dataOne[0].length !== 4
            ) {
              this.samples = '';
              this.formTraining.controls.file.setValue('');
              this.snack.open();
            }

            this.samples = this.dataOne.length;
          },
        });
      };
    }
  }

  classify() {
    this.isloading = true;
    this.isloadingResult = true;
    let nn = new MLP(
      this.dataOne[0].length,
      this.formClassify.value.neurons,
      3,
      this.formClassify.value.learningReating,
      this.formClassify.value.epochs
    );

    nn.shuffle(this.dataOne, this.dataTwo);

    nn.fit(this.dataOne, this.dataTwo);

    const a = nn.predict([
      this.formClassify.value.x,
      this.formClassify.value.y,
      this.formClassify.value.z,
      this.formClassify.value.r,
    ])!.data;

    setTimeout(() => {
      this.isloading = false;
      this.isloadingResult = false;
      const clas = [Math.round(a[0]), Math.round(a[1]), Math.round(a[2])];
      this.results = clas;
    }, 6000);
  }

  learnLinear() {
    this.isloading = true;
    this.isloadingResult = true;
    let nn = new MLP(
      this.dataOne[0].length,
      this.formTraining.value.neurons,
      3,
      this.formTraining.value.learningReating,
      this.formTraining.value.epochs
    );

    nn.shuffle(this.dataOne, this.dataTwo);

    nn.fit(this.dataOne, this.dataTwo);

    const a = nn.predict([
      this.formTraining.value.x,
      this.formTraining.value.y,
      this.formTraining.value.z,
      this.formTraining.value.r,
    ])!.data;

    setTimeout(() => {
      this.isloading = false;
      this.isloadingResult = false;
      const clas = [Math.round(a[0]), Math.round(a[1]), Math.round(a[2])];
      this.resultTraining = clas;
    }, 6000);
  }
}
