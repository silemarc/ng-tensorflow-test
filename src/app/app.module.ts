import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TensorFlowComponent } from './tensor-flow/tensor-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    TensorFlowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
