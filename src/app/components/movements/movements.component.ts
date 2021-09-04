import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Operation } from '../../models/operation.model';
import { OperationsService } from '../../services/operations.service';
import { OperationsComponent } from '../operations/operations.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  operations: Operation[] = [];
  /*  dataSource = ELEMENT_DATA; */
  /* displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']; */
  dataSource: any;
  displayedColumns: string[] = [
    'date',
    'category',
    'currency',
    'amount',
    'type',
    'account',
  ];
  /*  dataSource = new MatTableDataSource(this.operations); */

  constructor(private operationsService: OperationsService) {}

  ngOnInit(): void {
    this.dataSource = this.operationsService.getOperations();
    console.log(this.operations);
  }
}
