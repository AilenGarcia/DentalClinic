import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-paciente',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-paciente.html',
  styleUrl: './edit-paciente.css'
})
export class EditPaciente {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', Validators.required],
    apellido:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['',[Validators.required, Validators.minLength(10)]],
    domicilio: ['',Validators.required],
    dni: ['',[Validators.required, Validators.minLength(8)]]
  })

  get nombre(){
    return this.form.controls.nombre;
  }

  get apellido(){
    return this.form.controls.nombre;
  }

    get email(){
    return this.form.controls.nombre;
  }

    get telefono(){
    return this.form.controls.nombre;
  }

    get dni(){
    return this.form.controls.nombre;
  }

    get domicilio(){
    return this.form.controls.nombre;
  }

  handleSubmit(){
    const data = this.form.getRawValue();
    console.log(data)
  }
}