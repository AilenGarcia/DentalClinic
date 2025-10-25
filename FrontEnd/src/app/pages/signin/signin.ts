import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    nombre: ['',Validators.required],
    apellido: ['',Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password:['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ]],
    passwordConfirm: ["", Validators.required],
    tipoUsuario: ['2', [Validators.required]]
  },
{validators: this.passNotMatch()})

  private passNotMatch(): ValidatorFn{
    return (group: AbstractControl): ValidationErrors | null =>{
      const password = group.get('password')?.value;
      const confirm = group.get("passwordConfirm")?.value;

      if(password !== confirm){
        group.get('passwordConfirm')?.setErrors({noCoincide:true});
        return {noCoincide:true};
      }
      return null;
    }
  }

  get nombre() {
    return this.form.controls.nombre;
  }

  get apellido() {
    return this.form.controls.apellido;
  }

  get email(){
    return this.form.controls.email;
  }

  get password(){
    return this.form.controls.password;
  }

  get passwordConfirm(){
    return this.form.controls.passwordConfirm;
  }

  get tipoUsuario() { return this.form.get('tipoUsuario')!; }

  handleSubmit(){
    if(confirm('¿Desea confirmar los datos?')){
      const user = this.form.getRawValue();
      console.log(user);
    }
  }


}
