import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from 'src/app/components/list/list.component';
import { SessionService } from 'src/app/services/session.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { HomeComponent } from './home.component';
import { IVehicle } from 'src/app/shared/interfaces/vehicles.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';
import { of } from 'rxjs';

const vehicleMock = [
  {
    "id": "b6969a66-6db3-4de6-b5ae-e718298a1207",
    "placa": "AASSAASAS",
    "chassi": "SAASSASA",
    "renavam": "SAASASASAS",
    "modelo": "SASAASASAS",
    "marca": "SAASASSA",
    "ano": 5413
  }
];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sessionService: SessionService;
  let vehicleService: VehicleService;
  let httpTestingController: HttpTestingController;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ListComponent
      ],
      providers: [
        SessionService,
        VehicleService,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        HttpClientModule,
        MatSnackBarModule
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    sessionService = TestBed.inject(SessionService);
    vehicleService = TestBed.inject(VehicleService);
    snackBar = TestBed.inject(MatSnackBar);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('Deve criar a página de home', () => {
    expect(HomeComponent).toBeTruthy();
  });

  it('Deve chamar serviço de listagem de veiculos.', () => {
    spyOn(vehicleService, 'getVehicles').and.returnValue(of(vehicleMock));

    vehicleService.getVehicles().subscribe({ next: (res: IVehicle[]) => {
      expect(res).toEqual(vehicleMock);
    }});

    const req = httpTestingController.expectOne(environment.apiVehicles);
    expect(req.request.method).toEqual('GET');
    req.flush(vehicleMock);
  });

  it('Deve chamar o metodo de criação de veiculo.', () => {
    spyOn(vehicleService, 'createVehicles').and.returnValue(of(vehicleMock[0]));

    vehicleService.createVehicles(vehicleMock[0]).subscribe({ next: (res) => {
      expect(res).toEqual(vehicleMock[0]);
    }});

    const req = httpTestingController.expectOne(environment.apiVehicles);
    expect(req.request.method).toEqual('GET');
    req.flush(vehicleMock);

  });
});
