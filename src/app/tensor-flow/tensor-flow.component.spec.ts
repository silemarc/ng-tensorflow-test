import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TensorFlowComponent } from './tensor-flow.component';

describe('TensorFlowComponent', () => {
  let component: TensorFlowComponent;
  let fixture: ComponentFixture<TensorFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TensorFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
