import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ListComponent } from './list.component';
import { IVehicle } from 'src/app/shared/interfaces/vehicles.interface';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.vehicles = [];
    fixture.detectChanges();
  });

  it('Deve criar o component listagem de veiculos', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar metodo de edição de um veiculo e emitir dados do mesmo.', () => {
    spyOn(component.status, 'emit').and.callThrough();
    const vehicle: IVehicle = {
      id: "b642cbdc-4fbb-44fb-9764-e551cccdc14c",
      placa: "SIX9E20",
      chassi: "10290SA90SA",
      renavam: "SA09SA09SA0D9",
      modelo: "SUBARU",
      marca: "MITSUBISHI",
      ano: 2012,
    };
    component.editVehicle(vehicle);
    expect(component.status.emit).toHaveBeenCalled();
  });

  it('Deve chamar metodo de exclusão de um veiculo e emitir dados do mesmo.', () => {
    spyOn(component.status, 'emit').and.callThrough();
    const vehicle: IVehicle = {
      id: "b642cbdc-4fbb-44fb-9764-e551cccdc14c",
      placa: "SIX9E20",
      chassi: "10290SA90SA",
      renavam: "SA09SA09SA0D9",
      modelo: "SUBARU",
      marca: "MITSUBISHI",
      ano: 2012,
    };
    component.removeVehicle(vehicle);
    expect(component.status.emit).toHaveBeenCalled();
  });
});
