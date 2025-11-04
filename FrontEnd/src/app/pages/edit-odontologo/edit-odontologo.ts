import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-odontologo',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-odontologo.html',
  styleUrl: './edit-odontologo.css'
})
export class EditOdontologo {
private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', Validators.required],
    apellido:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    matricula: ['',[Validators.required, Validators.minLength(8)]],
    descripcion: ['',Validators.required],
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

    get matricula(){
    return this.form.controls.matricula;
  }

  get descripcion(){
    return this.form.controls.descripcion;
  }

  handleSubmit(){
    const data = this.form.getRawValue();
    console.log(data)
  }
}
