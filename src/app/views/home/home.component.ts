import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { VehicleModal } from 'src/app/components/vehicle-modal/vehicle-modal.component';
import { v4 as uuidv4 } from 'uuid';
import { SessionService } from '../../services/session.service';
import { VehicleService } from '../../services/vehicle.service';
import { ISession } from '../../shared/interfaces/session.interface';
import { IVehicle } from '../../shared/interfaces/vehicles.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { DeleteVehicleModalComponent } from 'src/app/shared/components/delete-vehicle-modal/delete-vehicle-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();
  public session$: Observable<ISession | null>;
  public vehicles: Array<IVehicle> = [];

  constructor(
    private sessionService: SessionService,
    private vehicleService: VehicleService,
    private router: Router,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.session$ = this.sessionService.getSession();
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (res: IVehicle[]) => {
            this.vehicles = res;
          }
        })
  }

  openCreateVehicleModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minHeight = "380px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: "Cadastro de veiculo",
      description: '',
      actionButtonText: "Criar",
      status: 'create',
    }
    this.matDialog.open(VehicleModal, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            this.addVehicle(res);
          }
        }
      })
  }

  openEditVehicleModal(vehicle: IVehicle): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.minHeight = "380px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: "Edição de veiculo",
      description: 'Ao clicar em salvar, os dados serão alterados',
      actionButtonText: "Atualizar",
      status: 'edit',
      vehicle: vehicle
    }
    this.matDialog.open(VehicleModal, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            this.updateVehicleData(res);
          }
        }
      })
  }

  openSnackBar(text: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1500,
      data: text
    });
  }

  actionType(obj: any): void {
    if (obj.status === 'edit') {
      this.openEditVehicleModal(obj.vehicle);
    } else {
      this.openRemoveVehicleModal(obj.vehicle.id);
    }
  }

  addVehicle(vehicle: IVehicle): void {
    vehicle.id = uuidv4();
    this.vehicleService.createVehicles(vehicle)
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.openSnackBar('Veiculo cricado com sucesso.');
            this.getVehicles();
          },
          error: () => {
            this.openSnackBar('Houve um problema, tente novamente!');
          }
        })
  }

  updateVehicleData(vehicle: IVehicle): void {
    this.vehicleService.updateVehicleData(vehicle)
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.getVehicles();
            this.openSnackBar('Dados de veiculo atualizados com sucesso.');
          },
          error: () => {
            this.openSnackBar('Houve um problema, tente novamente!');
          }
        })
  }

  removeVehicle(id: string): void {
    this.vehicleService.deleteVehicle(id)
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.getVehicles();
            this.openSnackBar('Veiculo removido com sucesso!');
          },
          error: () => {
            this.openSnackBar('Houve um problema, tente novamente!');
          }
        })
  }

  openRemoveVehicleModal(id: string): void {
    this.matDialog.open(DeleteVehicleModalComponent, {
      width: '250px',
    }).afterClosed().subscribe({ next: (res) => {
      if(res) this.removeVehicle(id);
    }});
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['/', 'login']);
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
