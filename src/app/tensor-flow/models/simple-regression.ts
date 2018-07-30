import * as tf from '@tensorflow/tfjs';
import {GenericModel} from './generic-model';

export class SimpleRegression implements GenericModel {
  model: any;
  loss: number;
  trainHistory: any;
  trained: boolean;
  xs: any;
  ys: any;

  generateData(params) {
    const numPoints = params['numPoints'];
    const coeff = params['coeff'];
    const sigma = params['sigma'] || 0.04;

    const [a, b, c, d] = [
      tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c),
      tf.scalar(coeff.d)
    ];

    this.xs = tf.randomUniform([numPoints], -1, 1);

    // Generate polynomial data
    // y = a * x ^ 3 + b * x ^ 2 + c * x + d
    const three = tf.scalar(3, 'int32');
    const ys = a.mul(this.xs.pow(three))
      .add(b.mul(this.xs.square()))
      .add(c.mul(this.xs))
      .add(d)
      // Add random noise to the generated data
      // to make the problem a bit more interesting
      .add(tf.randomNormal([numPoints], 0, sigma));

    // Normalize the y values to the range 0 to 1.
    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    this.ys = ys.sub(ymin).div(yrange);
  }

  defineModel() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 4, activation: 'relu', inputShape: [10]}));
    this.model.add(tf.layers.dense({units: 1, activation: 'linear'}));
    this.model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  }

  train(epochs) {
    // TODO
  }

  predict() {
    // TODO
  }


}
