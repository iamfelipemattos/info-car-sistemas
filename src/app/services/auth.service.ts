import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILogin } from "../shared/interfaces/login.interface";
import { environment } from "../../environments/environment.development";
import { ISignup } from "../shared/interfaces/signup.interface";

@Injectable({providedIn:'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  getUser(): Observable<ISignup[]> {
    return this.http.get<ISignup[]>(environment.apiAuth)
  }

  createUser(user: ILogin): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post(environment.apiAuth, body)
  }

}
