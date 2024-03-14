import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-vehicle-modal',
  templateUrl: './delete-vehicle-modal.component.html',
  styleUrls: ['./delete-vehicle-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule]
})
export class DeleteVehicleModalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteVehicleModalComponent>,) {}

  actionFunction() {
    this.dialogRef.close(true);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
