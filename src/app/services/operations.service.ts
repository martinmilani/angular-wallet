import { DatePipe, formatDate } from '@angular/common';
import { Injectable, Type } from '@angular/core';
import { Operation } from '../models/operation.model';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  operations: Operation[] = [];
  date: Date = new Date();
  currentDate: string = '';

  constructor() {
    this.currentDate = formatDate(
      this.date,
      'yyyy-MM-dd',
      'en'
    );
  }

  getOperations() {
    this.operations = JSON.parse(localStorage.getItem('operations') || '');
    return this.operations;
  }

  addOperation(operation: Operation) {
    let operations: any[] = [];
    if (localStorage.getItem('operations') !== null) {
      operations = JSON.parse(localStorage.getItem('operations') || '');
    }
    operations.push(operation);
    localStorage.setItem('operations', JSON.stringify(operations));
  }

  addTransfer(outputOperation:Operation, inputOperation:Operation){
    this.addOperation(outputOperation)
    this.addOperation(inputOperation)
  }
}
