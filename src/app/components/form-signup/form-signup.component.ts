import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../shared/interfaces/login.interface';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss'],
})
export class FormSignupComponent implements OnInit {
  @Output() user = new EventEmitter<ILogin>();
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initialFormState();
  }

  initialFormState() {
    this.form = this.formBuilder.group({
      'name': [
        null,
        [
          Validators.required,
        ]
      ],
      'email': [
        null,
        [
          Validators.required,
          Validators.email,
        ]
      ],
      'password': [
        null,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
    })
  }

  submit() {
    if (this.form.valid) {
      this.user.emit(this.form.value);
      this.form.reset();
    }
  }
}
