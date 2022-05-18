import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { Chart, registerables } from 'chart.js';
import { Papa } from 'ngx-papaparse';
import { SnackBarService } from '../../snack-bar/snack-bar.service';

@Component({
  selector: 'app-linear-regression-training',
  templateUrl: './linear-regression-training.component.html',
  styleUrls: ['./linear-regression-training.component.scss'],
  providers: [SnackBarService],
})
export class LinearRegressionTrainingComponent implements OnInit {
  @ViewChild('regressionLinear', { static: true })
  regressionLinear?: ElementRef;

  test: any = [];
  test2: any = [];
  samples = '';
  result = '';
  resultTraining = '';
  chart!: Chart;
  isloading = false;
  isloadingResult = false;

  get sampleChoose() {
    return this.test.length
      ? this.test[this.formTraining.value.variable - 1]
      : '';
  }
  formTraining = this.fb.group({
    epochs: ['', Validators.required],
    variable: ['', Validators.required],
    file: ['', Validators.required],
    error: ['', Validators.required],
  });

  formResult = this.fb.group({
    epochs: [, Validators.required],
    variable: ['', Validators.required],
    error: ['', Validators.required],
  });

  constructor(
    private papa: Papa,
    private fb: FormBuilder,
    private snackbar: SnackBarService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chart = new Chart(this.regressionLinear?.nativeElement, {
      type: 'bubble',
      data: {
        datasets: [
          {
            type: 'line',
            label: 'Reta da Regressão Linear',
            data: [],
            fill: false,
            borderColor: 'blue',
            pointRadius: 0,
          },
          {
            type: 'bubble',
            label: 'Dados',
            data: [],
            backgroundColor: 'red',
            borderColor: 'transparent',
          },
        ],
      },
    });

    this.formTraining.valueChanges.subscribe(() => {
      this.resultTraining = '';
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
            this.test = results.data.map((d: any) => parseFloat(d.y));
            this.test2 = results.data.map((d: any) => parseFloat(d.x));

            if (
              results.errors.length ||
              this.test.includes(NaN, undefined, null) ||
              this.test2.includes(NaN, undefined, null)
            ) {
              this.snackbar.open();
              this.formTraining.controls.file.setValue('');
              this.samples = '';
            }
            this.samples = this.test.length.toString();
          },
        });
      };
    } else {
      this.samples = '';
    }
  }

  async learnLinear() {
    this.isloading = true;
    this.isloadingResult = true;

    const xs = tf.tensor2d(this.test2, [this.test2.length, 1]);
    const ys = tf.tensor2d(this.test, [this.test.length, 1]);

    const model = tf.sequential();

    const learningRate = 0.00001;
    const optimizer = tf.train.sgd(learningRate);

    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({
      loss: this.formTraining.value.error,
      optimizer: optimizer,
    });

    const history: any = [];
    const surface = { name: 'Erro x Interação', tab: 'Treinamento' };

    await model.fit(xs, ys, {
      epochs: this.formTraining.value.epochs,
      callbacks: {
        onEpochEnd: (epoch, log) => {
          history.push(log);
          tfvis.show.history(surface, history, ['loss'], {
            width: 400,
            height: 250,
          });
        },
      },
    });

    this.viewPredictionInGraphic(xs, model);

    const a = (await model.predict(
      tf.tensor2d([this.formTraining.value.variable], [1, 1]) as tf.Tensor
    )) as tf.Tensor;

    this.resultTraining = a.dataSync()[0].toString();
    this.isloading = false;
    this.isloadingResult = false;
  }

  async resultRegression() {
    this.isloadingResult = true;
    this.isloading = true;

    const xs = tf.tensor2d(this.test2, [this.test2.length, 1]);
    const ys = tf.tensor2d(this.test, [this.test.length, 1]);

    const model = tf.sequential();

    const learningRate = 0.00001;
    const optimizer = tf.train.sgd(learningRate);

    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({
      loss: this.formResult.value.error,
      optimizer: optimizer,
    });

    const history: any = [];
    const surface = { name: 'Treinamento', tab: 'Training' };

    await model.fit(xs, ys, {
      epochs: this.formResult.value.epochs,
      callbacks: {
        onEpochEnd: (epoch, log) => {
          history.push(log);
          tfvis.show.history(surface, history, ['loss'], {
            width: 400,
            height: 250,
          });
        },
      },
    });

    const a = (await model.predict(
      tf.tensor2d([this.formResult.value.variable], [1, 1]) as tf.Tensor
    )) as tf.Tensor;

    this.result = a.dataSync()[0].toString();

    this.isloading = false;
    this.isloadingResult = false;
  }

  private viewPredictionInGraphic(x: any, model: any) {
    let zip = (arrx: [], arry: []) =>
      arrx.map((x, i) => {
        return { x: x, y: arry[i] };
      });

    let t_pred = model.predict(x);
    let y_pred = t_pred.dataSync();
    let ar_pred = zip(this.test2, y_pred);
    const toy_data = zip(this.test2, this.test);

    this.chart.destroy();

    this.chart = new Chart(this.regressionLinear?.nativeElement, {
      type: 'bubble',
      data: {
        labels: this.test2,
        datasets: [
          {
            type: 'line',
            label: 'Reta da Regressão Linear',
            data: ar_pred,
            fill: false,
            borderColor: 'blue',
            pointRadius: 0,
          },
          {
            type: 'bubble',
            label: 'Dados',
            data: toy_data,
            backgroundColor: 'red',
            borderColor: 'transparent',
          },
        ],
      },
    });
  }
}
