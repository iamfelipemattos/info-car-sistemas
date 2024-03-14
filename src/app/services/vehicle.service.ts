import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { IVehicle } from "../shared/interfaces/vehicles.interface";

@Injectable({providedIn:'root'})
export class VehicleService {

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<IVehicle[]> {
    return this.http.get<IVehicle[]>(environment.apiVehicles)
  }

  createVehicles(vehicle: IVehicle): Observable<any> {
    const body = JSON.stringify(vehicle);
    return this.http.post(environment.apiVehicles, body)
  }

  updateVehicleData(vehicle: IVehicle): Observable<any> {
    const body = JSON.stringify(vehicle);
    return this.http.put(`${environment.apiVehicles}/${vehicle.id}`, body)
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${environment.apiVehicles}/${id}`)
  }
}
