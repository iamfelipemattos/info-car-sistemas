import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IVehicle } from '../../shared/interfaces/vehicles.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() vehicles!: Array<IVehicle>;
  @Output() status = new EventEmitter<{vehicle: IVehicle, status: string}>();

  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  editVehicle(vehicle: IVehicle): void {
    this.status.emit({ vehicle, status: 'edit'})
  }

  removeVehicle(vehicle: IVehicle): void {
    this.status.emit({ vehicle, status: 'delete'});
  }
 }
