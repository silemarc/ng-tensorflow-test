import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Simple} from './models/simple';
import Chart from 'chart.js';
import {SimpleRegression} from './models/simple-regression';
import {GenericModel} from './models/generic-model';

@Component({
  selector: 'app-tensor-flow',
  templateUrl: './tensor-flow.component.html',
  styleUrls: ['./tensor-flow.component.css']
})
export class TensorFlowComponent implements OnInit {

  public currentModel: GenericModel;
  public summary: String;
  public epochs = 100;

  @ViewChild('plot1', {read: ElementRef})
  plot1Canvas: ElementRef;
  private plot1Chart: Chart;

  @ViewChild('trainPlot', {read: ElementRef})
  trainPlotCanvas: ElementRef;
  private trainChart: Chart;

  constructor() {
  }

  ngOnInit() {
    console.log('Init TensorFlowComponent...');
  }

  simpleModel() {
    this.currentModel = new Simple();
    this.currentModel.generateData({});
    this.currentModel.defineModel();
    this.generateSummary();
  }

  async regressionModel() {
    this.currentModel = new SimpleRegression();

    const trueCoefficients = {a: -.8, b: -.2, c: .9, d: .5};
    this.currentModel.generateData({'coeff': trueCoefficients, 'numPoints': 100});
    this.plot1Chart = this.plot(await this.prepareDataToPlot(), 'Original data', this.plot1Canvas, this.plot1Chart);
    this.currentModel.defineModel();
    this.generateSummary();

  }

  async train() {
    const res = await this.currentModel.train(this.epochs);

    this.trainChart = this.plot(this.currentModel.trainHistory, 'Train loss', this.trainPlotCanvas,  this.trainChart);
  }

  generateSummary() {
    this.summary = '';
    this.currentModel.model.summary(null, null, (msg) => {
      this.summary += `\n${msg}`;
    });
  }

  private plot(data, label, elementRef, chart) {
    const canvas = (<HTMLCanvasElement>elementRef.nativeElement);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const config = {
      type: 'scatter',
      data: {
        datasets: [{
          label: label,
          data: data
        }]
      },
      options: {

        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    };

    if (chart) {
      chart.destroy();
    }

    return new Chart(ctx, config);

  }


  private async prepareDataToPlot() {
    const xvals = await this.currentModel.xs.data();
    const yvals = await this.currentModel.ys.data();

    return Array.from(yvals).map((y, i) => {
      return {'x': xvals[i], 'y': yvals[i]};
    });
  }

}
