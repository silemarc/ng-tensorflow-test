import * as tf from '@tensorflow/tfjs';
import {GenericModel} from './generic-model';
// Load the binding:
// require('@tensorflow/tfjs-node-gpu');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

export class Simple implements GenericModel {

  model: any;
  xs: any;
  ys: any;
  loss: number;
  trainHistory: any;
  trained = false;

  defineModel() {
    console.log('Start defining model...');
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
    this.model.add(tf.layers.dense({units: 1, activation: 'linear'}));
    this.model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  }


  generateData(params) {
    this.xs = tf.randomNormal([100, 10]);
    this.ys = tf.randomNormal([100, 1]);
  }

  async train(epochs = 100) {
    this.trainHistory = [];
    this.trained = false;
    return await this.model.fit(this.xs, this.ys, {
      epochs: epochs,
      callbacks: {
        onEpochEnd: async (epoch, log) => {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`);
          this.loss = log.loss;
          this.trainHistory[epoch] = {x: epoch, y: log.loss};
        },
        onTrainEnd: () => {
          this.trained = true;
          return true;
        }
      }
    });
  }

  predict(input) {
  }

  summary() {
    let summary = '';
    this.model.summary(null, null, (msg) => {
      summary += `\n${msg}`;
    });
    return summary;
  }
}
