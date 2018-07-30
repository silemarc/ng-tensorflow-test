export interface GenericModel {
  model: any;
  xs: any;
  ys: any;
  loss: number;
  trainHistory: any;
  trained: boolean;

  generateData(params);
  defineModel();
  train(epochs);
  predict(input);
  summary();
}
