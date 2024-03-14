import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
@Injectable()
export class VehicleModal implements OnInit {
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<VehicleModal>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      'id': [
        { value: null || this.modalData?.vehicle?.id, disabled: true},
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      'placa': [
        null || this.modalData?.vehicle?.placa,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      'chassi': [
        null || this.modalData?.vehicle?.chassi,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      'renavam': [
        null || this.modalData?.vehicle?.renavam,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      'modelo': [
        null || this.modalData?.vehicle?.modelo,
        [
          Validators.required,
          Validators.minLength(2),
        ]
      ],
      'marca': [
        null || this.modalData?.vehicle?.marca,
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      'ano': [
        null || this.modalData?.vehicle?.ano,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]
      ],
    })
  }

  actionFunction() {
    this.dialogRef.close(this.form.getRawValue());
  }

  closeModal() {
    this.dialogRef.close();
  }
}
