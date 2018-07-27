import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Simple} from './models/simple';
import Chart from 'chart.js';

@Component({
  selector: 'app-tensor-flow',
  templateUrl: './tensor-flow.component.html',
  styleUrls: ['./tensor-flow.component.css']
})
export class TensorFlowComponent implements OnInit {

  public currentModel: Simple;
  public summary: String;
  public epochs = 100;

  @ViewChild('plot', {read: ElementRef})
  plotCanvas: ElementRef;
  private scatterChart: Chart;

  constructor() {
  }

  ngOnInit() {
    console.log('Init TensorFlowComponent...');
  }

  simpleModel() {
    this.currentModel = new Simple();
    this.currentModel.defineModel();
    this.generateSummary();
  }

  async train() {
    const res = await this.currentModel.train(this.epochs);

    // if (res) {
    this.plot();
    // }
  }

  generateSummary() {
    this.summary = '';
    this.currentModel.model.summary(null, null, (msg) => {
      this.summary += `\n${msg}`;
    });
  }

  private plot() {
    const canvas = (<HTMLCanvasElement>this.plotCanvas.nativeElement);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const config = {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Train loss',
          data: this.currentModel.trainHistory
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

    if (this.scatterChart) {
      this.scatterChart.destroy();
    }

    this.scatterChart = new Chart(ctx, config);

  }


}
