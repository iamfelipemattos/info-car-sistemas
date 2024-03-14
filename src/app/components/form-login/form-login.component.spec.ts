import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLoginComponent } from './form-login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o component de Formulario para Login', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar estanciar form', () => {
    spyOn(component, 'initialFormState').and.callThrough();
    component.ngOnInit();
    expect(component.initialFormState).toHaveBeenCalled();
  });

  it('Deve emitir os dados do formulario', () => {
    spyOn(component.user, 'emit').and.callThrough();
    component.form.controls['email'].setValue('teste@gmail.com');
    component.form.controls['password'].setValue('123456');
    component.submit();
    expect(component.user.emit).toHaveBeenCalled();
  });
});
