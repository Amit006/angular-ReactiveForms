import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 6';
  mainForm: FormGroup;
  orderLines = [
    {price: 10, time: new Date(), quantity: 2},
    {price: 20, time: new Date(), quantity: 3},
    {price: 30, time: new Date(), quantity: 3},
    {price: 40, time: new Date(), quantity: 5}
    ]
  constructor() {
    this.mainForm = this.getForm();
  }

  getForm(): FormGroup {
    return new FormGroup({
      globalPrice: new FormControl(),
      orderLines: new FormArray(this.orderLines.map(this.getFormGroupForLine))
    })
  }

  getFormGroupForLine(orderLine: any): FormGroup {
    return new FormGroup({
      price: new FormControl(orderLine.price)
    })
  }

  applyPriceToAll() {
    const formLines = this.mainForm.get('orderLines') as FormArray;
    const globalPrice = this.mainForm.get('globalPrice').value;
    formLines.controls.forEach(control => control.get('price').setValue(globalPrice));
  }

  submitForm() {

  }
}
