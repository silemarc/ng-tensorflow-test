import * as tf from '@tensorflow/tfjs';
import {GenericModel} from './generic-model';

export class SimpleRegression implements GenericModel {
  model: any;
  loss: number;
  trainHistory: any;
  trained: boolean;
  xs: any;
  ys: any;
  a = tf.variable(tf.scalar(Math.random()));
  b = tf.variable(tf.scalar(Math.random()));
  c = tf.variable(tf.scalar(Math.random()));
  d = tf.variable(tf.scalar(Math.random()));
  learningRate = 0.5;
  optimizer = tf.train.sgd(this.learningRate);


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
    tf.dispose(ys);
    tf.dispose(ymax);
    tf.dispose(yrange);
  }

  defineModel() {
  }

  summary() {
    return `<span>a=${this.a.toString()}, b=${this.b.toString()}, c=${
      this.c.toString()},  d=${this.d.toString()}</span>`;
  }

  async train(epochs) {
    this.trainHistory = [];
    for (let iter = 0; iter < epochs; iter++) {
      // optimizer.minimize is where the training happens.

      // The function it takes must return a numerical estimate (i.e. loss)
      // of how well we are doing using the current state of
      // the variables we created at the start.

      // This optimizer does the 'backward' step of our training process
      // updating variables defined previously in order to minimize the
      // loss.
      this.optimizer.minimize(() => {
        // Feed the examples into the model
        const lossRes = this.lossFunction(this.predict(this.xs), this.ys);
        this.trainHistory[iter] = {x: iter, y: this.loss};
        // this.loss = lossRes.toFixed(2);
        return lossRes;
      });

      // Use tf.nextFrame to not block the browser.
      await tf.nextFrame();


    }
  }

  predict(x) {
      return this.a.mul(x.pow(tf.scalar(3, 'int32')))
        .add(this.b.mul(x.square()))
        .add(this.c.mul(x))
        .add(this.d);
  }


  /*
 * This will tell us how good the 'prediction' is given what we actually
 * expected.
 *
 * prediction is a tensor with our predicted y values.
 * labels is a tensor with the y values the model should have predicted.
 */
  private lossFunction(prediction, labels) {
    // Having a good error function is key for training a machine learning model
    const error = prediction.sub(labels).square().mean();
    return error;
  }

}
