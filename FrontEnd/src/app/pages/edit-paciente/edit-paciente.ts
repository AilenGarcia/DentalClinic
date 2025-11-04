import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalPassword } from '../../components/modal-password/modal-password';

@Component({
  selector: 'app-edit-paciente',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-paciente.html',
  styleUrl: './edit-paciente.css'
})
export class EditPaciente {
  private readonly formBuilder = inject(FormBuilder);
  private readonly modalDialog = inject(MatDialog)

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

  openModal(){
    const dialogRef = this.modalDialog.open(ModalPassword)
    dialogRef.afterClosed().subscribe(()=>{
      console.log('hola')
    })
  }

  handleSubmit(){
    const data = this.form.getRawValue();
    console.log(data)
  }
}