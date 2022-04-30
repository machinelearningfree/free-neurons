import { Component, OnInit } from '@angular/core';
import { c } from './data';

@Component({
  selector: 'app-binary-classification',
  templateUrl: './binary-classification.component.html',
  styleUrls: ['./binary-classification.component.scss'],
})
export class BinaryClassificationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.generateData(100, 0.6);
  }

  gaussianRand(a: any, b: any) {
    var rand = 0;
    for (var i = 0; i < 6; i++) {
      rand += Math.random();
    }
    return rand / 6 + (Math.random() * a + b);
  }

  generateData(numPoints: any, frac: any) {
    // class proportion
    let nx1 = Math.round(numPoints * frac);
    let nx2 = numPoints - nx1;

    // create random 2 dimension data
    let data1 = Array(nx1)
      .fill(0)
      .map(() => {
        return { x: this.gaussianRand(10, 7), y: this.gaussianRand(10, 7) };
      });

    let class1 = Array(nx1).fill(0);

    let data2 = Array(nx2)
      .fill(0)
      .map(() => {
        return { x: this.gaussianRand(9, 0), y: this.gaussianRand(9, 0) };
      });

    let class2 = Array(nx2).fill(1);

    // split 30% for data validation
    /* let nv1 = Math.round(nx1 * 0.7);
    let nv2 = Math.round(nx2 * 0.7);

    let trainPt = [data1.slice(0, nv1), data2.slice(0, nv2)];

    let valPt = [data1.slice(nv1), data2.slice(nv2)];

    let x_train = this.toArray(trainPt[0].concat(trainPt[1]));

    let y_train = class1.slice(0, nv1).concat(class2.slice(0, nv2));

    let x_val = this.toArray(valPt[0].concat(valPt[1]));
    let y_val = class1.slice(nv1).concat(class2.slice(nv2));

    console.log(nx1);
    console.log(nx2);
    console.log(nv1);
    console.log(nv2);
    console.log(data2);
    console.log(data1);
    console.log(class2);
    console.log(class1);

    console.log(x_train);
    console.log(y_train);

    console.log(x_val);
    console.log(y_val);

    console.log(trainPt);

    console.log(valPt);

    return {
      x_train,
      y_train,
      x_val,
      y_val,
      trainPt,
      valPt,
    }; */
  }
}
