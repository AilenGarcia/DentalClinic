import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalPassword } from '../../components/modal-password/modal-password';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-odontologo',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-odontologo.html',
  styleUrl: './edit-odontologo.css'
})
export class EditOdontologo {
private readonly formBuilder = inject(FormBuilder);
private readonly modalDialog = inject(MatDialog)


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
