import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { Chart, registerables } from 'chart.js';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'app-binary-classification-training',
  templateUrl: './binary-classification-training.component.html',
  styleUrls: ['./binary-classification-training.component.scss'],
})
export class BinaryClassificationTrainingComponent implements OnInit {
  @ViewChild('training', { static: true })
  training?: ElementRef;

  @ViewChild('classifique', { static: true })
  classifique?: ElementRef;

  graphicClassify!: Chart;
  graphicTraining!: Chart;
  results = '';

  validation = '';
  acurracy = '';

  dataOne: any = [];
  dataTwo: any = [];

  class1: any = [];
  class2: any = [];

  trainPt: any = [];
  valPt: any = [];

  x_train: any = [];
  y_train: any = [];

  x_val: any = [];
  y_val: any = [];

  formTraining = this.fb.group({
    epochs: ['', Validators.required],
    samples: ['', Validators.required],
    learningReating: ['', Validators.required],
    neurons: ['', Validators.required],
    file: ['', Validators.required],
  });

  formClassify = this.fb.group({
    epochs: ['', Validators.required],
    samples: ['', Validators.required],
    learningReating: ['', Validators.required],
    neurons: ['', Validators.required],
    x: ['', Validators.required],
    y: ['', Validators.required],
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
            label: 'class 0',
            backgroundColor: 'black',
          },
          {
            data: [],
            label: 'class 1',
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        responsive: false,
      },
    });

    this.graphicClassify = new Chart(this.classifique?.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: [],
            label: 'class 0',
            backgroundColor: 'black',
          },
          {
            data: [],
            label: 'class 1',
            backgroundColor: 'red',
          },
          {
            type: 'bubble',
            data: [],
            label: 'Dado classificado',
            backgroundColor: '#32fa32',
            borderColor: 'green',
          },
        ],
      },
      options: {
        responsive: false,
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
          complete: (results: any) => {
            this.dataTwo = results.data
              .map((d: any) => {
                if (parseInt(d.c) === 1) {
                  this.class2.push(parseInt(d.c));
                  return {
                    x: parseFloat(d.x),
                    y: parseFloat(d.y),
                  };
                }
                return;
              })
              .filter((a: any) => a);

            this.dataOne = results.data
              .map((d: any) => {
                if (parseInt(d.c) === 0) {
                  this.class1.push(parseInt(d.c));

                  return {
                    x: parseFloat(d.x),
                    y: parseFloat(d.y),
                  };
                }
                return;
              })
              .filter((a: any) => a);

            let nv1 = Math.round(this.dataOne.length * 0.7);
            let nv2 = Math.round(this.dataTwo.length * 0.7);

            this.trainPt = [
              this.dataOne.slice(0, nv1),
              this.dataTwo.slice(0, nv2),
            ];

            this.valPt = [this.dataOne.slice(nv1), this.dataTwo.slice(nv2)];

            this.x_train = this.toArray(
              this.trainPt[0].concat(this.trainPt[1])
            );

            this.y_train = this.class1
              .slice(0, nv1)
              .concat(this.class2.slice(0, nv2));

            this.x_val = this.toArray(this.valPt[0].concat(this.valPt[1]));
            this.y_val = this.class1.slice(nv1).concat(this.class2.slice(nv2));
          },
        });
      };
    } else {
    }
  }

  private toArray(arr: any) {
    let out = [];
    for (var i = 0; i < arr.length; i++) {
      out.push([arr[i].x, arr[i].y]);
    }
    return out;
  }

  async classify() {
    const model = tf.sequential();

    const x_train = tf.tensor2d(this.x_train, [this.x_train.length, 2]);
    const y_train = tf.tensor2d(this.y_train, [this.y_train.length, 1]);

    const x_val = tf.tensor2d(this.x_val, [this.x_val.length, 2]);
    const y_val = tf.tensor2d(this.y_val, [this.y_val.length, 1]);

    model.add(
      tf.layers.dense({
        units: this.formTraining.value.neurons,
        activation: 'sigmoid',
        inputShape: [2],
      })
    );

    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    const mySGD = tf.train.sgd(this.formTraining.value.learningReating);

    model.compile({
      loss: 'binaryCrossentropy',
      optimizer: mySGD,
      metrics: ['accuracy'],
    });

    const trainLogs: any = [];
    const surface = { name: 'show.history live', tab: 'Training' };

    await model.fit(x_train, y_train, {
      epochs: this.formTraining.value.epochs,
      validationData: [x_val, y_val],
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          trainLogs.push(logs);
          tfvis.show.history(surface, trainLogs, ['loss', 'val_loss'], {
            width: 400,
            height: 250,
          });
          tfvis.show.history(surface, trainLogs, ['acc', 'val_acc'], {
            width: 400,
            height: 250,
          });
        },
      },
    });

    this.graphicClass();

    let y_pred = model.predict(
      tf.tensor2d(
        [[this.formClassify.value.x, this.formClassify.value.y]],
        [1, 2]
      ) as tf.Tensor
    ) as tf.Tensor;

    this.results =
      'Class: ' + Math.round(parseFloat(y_pred.dataSync().toString()));
  }

  async learnLinear() {
    const model = tf.sequential();

    const x_train = tf.tensor2d(this.x_train, [this.x_train.length, 2]);
    const y_train = tf.tensor2d(this.y_train, [this.y_train.length, 1]);

    const x_val = tf.tensor2d(this.x_val, [this.x_val.length, 2]);
    const y_val = tf.tensor2d(this.y_val, [this.y_val.length, 1]);

    model.add(
      tf.layers.dense({
        units: this.formTraining.value.neurons,
        activation: 'sigmoid',
        inputShape: [2],
      })
    );

    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    const mySGD = tf.train.sgd(this.formTraining.value.learningReating);

    model.compile({
      loss: 'binaryCrossentropy',
      optimizer: mySGD,
      metrics: ['accuracy'],
    });

    const trainLogs: any = [];
    const surface = { name: 'show.history live', tab: 'Training' };

    await model.fit(x_train, y_train, {
      epochs: this.formTraining.value.epochs,
      validationData: [x_val, y_val],

      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          trainLogs.push(logs);
          tfvis.show.history(surface, trainLogs, ['loss', 'val_loss'], {
            width: 400,
            height: 250,
          });
          tfvis.show.history(surface, trainLogs, ['acc', 'val_acc'], {
            width: 400,
            height: 250,
          });
        },
      },
    });

    let eval_train = model.evaluate(x_train, y_train) as any;
    let eval_val = model.evaluate(x_val, y_val) as any;

    let round = (num: any) => parseFloat(`${num * 100}`).toFixed(2);

    this.acurracy =
      'Training Accuracy:' + round(eval_train[1].dataSync()) + '%';

    this.validation =
      'Validation Accuracy : ' + round(eval_val[1].dataSync()) + '%';

    this.graphicTraing();
  }

  graphicClass() {
    this.graphicClassify.destroy();
    new Chart(this.classifique?.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: this.valPt[0],
            label: 'class 0',
            backgroundColor: 'black',
          },
          {
            data: this.valPt[1],
            label: 'class 1',
            backgroundColor: 'red',
          },
          {
            type: 'bubble',
            data: [
              {
                x: this.formClassify.value.x,
                y: this.formClassify.value.y,
                r: 5,
              },
            ],
            label: 'new data',
            backgroundColor: '#32fa32',
            borderColor: 'green',
          },
        ],
      },
      options: {
        responsive: false,
      },
    });
  }

  graphicTraing() {
    this.graphicTraining.destroy();

    this.graphicTraining = new Chart(this.training?.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: this.trainPt[0],
            label: 'class 0',
            backgroundColor: 'black',
          },
          {
            data: this.trainPt[1],
            label: 'class 1',
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        responsive: false,
      },
    });
  }
}
