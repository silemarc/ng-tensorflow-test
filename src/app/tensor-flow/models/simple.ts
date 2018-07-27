import * as tf from '@tensorflow/tfjs';
// Load the binding:
// require('@tensorflow/tfjs-node-gpu');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

export class Simple {

  model: any;
  xs: any;
  ys: any;
  loss: number;

  defineModel() {
    console.log('Start defining model...');
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
    this.model.add(tf.layers.dense({units: 1, activation: 'linear'}));
    this.model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

    this.xs = tf.randomNormal([100, 10]);
    this.ys = tf.randomNormal([100, 1]);

  }


  train(epochs = 100) {
    this.model.fit(this.xs, this.ys, {
      epochs: epochs,
      callbacks: {
        onEpochEnd: async (epoch, log) => {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`);
          this.loss = log.loss;
        }
      }
    });
  }
}
