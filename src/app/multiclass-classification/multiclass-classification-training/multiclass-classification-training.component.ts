import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
import { Papa } from 'ngx-papaparse';
import { x, y } from './data';
import { MLP } from './MLP';

@Component({
  selector: 'app-multiclass-classification-training',
  templateUrl: './multiclass-classification-training.component.html',
  styleUrls: ['./multiclass-classification-training.component.scss'],
})
export class MulticlassClassificationTrainingComponent implements OnInit {
  @ViewChild('training', { static: true })
  training?: ElementRef;

  graphicTraining!: Chart;
  results = '';

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

  constructor(private papa: Papa, private fb: FormBuilder) {
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

    console.log(x[0].length, x[0].length * 2, 3, 0.01, 1);

    let nn = new MLP(x[0].length, x[0].length * 2, 3, 0.01, 500);

    nn.shuffle(x, y);

    //var t0 = performance.now();
    nn.fit(x, y);
    //var t1 = performance.now();
    //console.log("Training took " + (t1 - t0) + " milliseconds.")

    // expected output [0,1,0] = Iris-versicolor

    console.table(nn.predict([5.9, 3.0, 5.1, 1.8])!.data);
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
            console.log(results);
          },
        });
      };
    }
  }

  classify() {
    let nn = new MLP(x[0].length, x[0].length * 2, 3, 0.01, 500);

    nn.shuffle(x, y);

    //var t0 = performance.now();
    nn.fit(x, y);
    //var t1 = performance.now();
    //console.log("Training took " + (t1 - t0) + " milliseconds.")

    // expected output [0,1,0] = Iris-versicolor

    console.table(nn.predict([6.5, 2.8, 4.6, 1.5])!.data);
  }

  learnLinear() {
    let nn = new MLP(x[0].length, x[0].length * 2, 3, 0.01, 500);

    nn.shuffle(x, y);

    //var t0 = performance.now();
    nn.fit(x, y);
    //var t1 = performance.now();
    //console.log("Training took " + (t1 - t0) + " milliseconds.")

    // expected output [0,1,0] = Iris-versicolor

    /*  console.table(nn.predict([6.5, 2.8, 4.6, 1.5])!.data); */
  }
}
