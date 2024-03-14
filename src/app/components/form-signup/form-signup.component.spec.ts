import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSignupComponent } from './form-signup.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormSignupComponent', () => {
  let component: FormSignupComponent;
  let fixture: ComponentFixture<FormSignupComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignupComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o component de Formulario para criação de um usuário', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar estanciar form', () => {
    spyOn(component, 'initialFormState').and.callThrough();
    component.ngOnInit();
    expect(component.initialFormState).toHaveBeenCalled();
  });

  it('Deve emitir os dados do formulario', () => {
    spyOn(component.user, 'emit').and.callThrough();
    component.form.controls['name'].setValue('Felipe Mattos');
    component.form.controls['email'].setValue('teste@gmail.com');
    component.form.controls['password'].setValue('123456');
    component.submit();
    expect(component.user.emit).toHaveBeenCalled();
  });
});
