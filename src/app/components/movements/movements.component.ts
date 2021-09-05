import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Operation } from '../../models/operation.model';
import { OperationsService } from '../../services/operations.service';
import { UsersService } from '../../services/users.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  showTable: Boolean = false;
  operations: Operation[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'date',
    'category',
    'account',
    'amount',
    'type',
  ];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private operationsService: OperationsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.operationsService
      .getOperationsByUserId(this.usersService.getCurrentUser().id)
      .subscribe((operations) => (this.operations = operations));
    this.dataSource = new MatTableDataSource(this.operations);
    this.showTable = !(this.operations.length == 0);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async logData(operation: Operation) {
    Swal.fire({
      title: 'Editar Categoría',
      input: 'text',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      inputValidator: (value) => {
        if (!value) return 'Debe escribir una categoría';
        else return null;
      },
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        if (operation.category == 'Transferencia') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las transferencias no son editables!',
          });
        } else {
          operation.category = result.value;
          this.operationsService.editCategory(operation);
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
