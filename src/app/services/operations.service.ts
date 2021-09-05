import { DatePipe, formatDate } from '@angular/common';
import { Injectable, Type } from '@angular/core';
import { Operation } from '../models/operation.model';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  operations: Operation[] = [];
  date: Date = new Date();
  currentDate: string = '';

  constructor() {
    this.currentDate = formatDate(this.date, 'yyyy-MM-dd', 'en');
  }

  getOperations(): Observable<Operation[]> {
    const operations = of(
      JSON.parse(localStorage.getItem('operations') || '[]')
    );
    return operations;
  }

  getOperationsByUserId(userId: number): Observable<Operation[]> {
    const operations = of(
      JSON.parse(localStorage.getItem('operations') || '[]').filter(
        (item: Operation) => item.userId === userId
      )
    );
    return operations;
  }

  getLastOperationsId() {
    let id = JSON.parse(localStorage.getItem('operations') || '[]').length + 1;
    return id;
  }

  addOperation(operation: Operation) {
    let operations: any[] = [];
    if (localStorage.getItem('operations') !== null) {
      operations = JSON.parse(localStorage.getItem('operations') || '');
    }
    operations.push(operation);
    localStorage.setItem('operations', JSON.stringify(operations));

    Swal.fire({
      icon: 'success',
      text: 'La operacion ha sido guardada exitosamente!',
      confirmButtonText: `Aceptar`,
    });
  }

  addTransfer(expenseOperation: Operation, incomeOperation: Operation) {
    this.addOperation(expenseOperation);
    this.addOperation(incomeOperation);
  }

  editCategory(operation: Operation) {
    let editedOperations = this.operations;
    this.operations.find((o, i) => {
      if (o.id === operation.id) {
        editedOperations[i] = operation;
      }
      localStorage.setItem('operations', JSON.stringify(editedOperations));
    });
  }

  getTotals(userId: number, currency: string, type: string) {
    let op = JSON.parse(localStorage.getItem('operations') || '[]')
      .filter((item: Operation) => item.userId === userId)
      .filter((item: Operation) => item.currency === currency)
      .filter((item: Operation) => item.type === type);
    if (op.length === 0) {
      return 0;
    } else {
      let sum = op.reduce((a: any, b: any) => ({
        amount: a.amount + b.amount,
      }));
      return sum.amount;
    }
  }
}
