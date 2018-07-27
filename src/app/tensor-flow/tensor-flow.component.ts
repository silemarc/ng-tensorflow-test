import {Component, OnInit} from '@angular/core';
import {Simple} from './models/simple';

@Component({
  selector: 'app-tensor-flow',
  templateUrl: './tensor-flow.component.html',
  styleUrls: ['./tensor-flow.component.css']
})
export class TensorFlowComponent implements OnInit {

  public currentModel: Simple;
  public summary: String;
  public epochs = 100;

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

  train() {
    this.currentModel.train(this.epochs);
  }

  generateSummary() {
    this.summary = '';
    this.currentModel.model.summary(null, null, (msg) => {
      this.summary += `\n${msg}`;
    });
  }
}
