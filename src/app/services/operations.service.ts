import { DatePipe, formatDate } from '@angular/common';
import { Injectable, Type } from '@angular/core';
import { Operation } from '../models/operation.model';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  operations: Operation[] = [];
  currentDate: Date = new Date();
  formattedCurrentDate: string = '';

  constructor() {
    this.formattedCurrentDate = formatDate(
      this.currentDate,
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

    console.log(operation);
  }
}
