import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../views/login/login.component';
import { FormLoginComponent } from '../components/form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormSignupComponent } from '../components/form-signup/form-signup.component';
import { HomeComponent } from '../views/home/home.component';
import { ListComponent } from '../components/list/list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehicleModal } from '../components/vehicle-modal/vehicle-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ListComponent,
    FormLoginComponent,
    FormSignupComponent,
    VehicleModal,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports:[
    LoginComponent,
    HomeComponent,
    ListComponent,
    FormLoginComponent,
    FormSignupComponent,
    VehicleModal,
  ]
})
export class SharedModule { }
