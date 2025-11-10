import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalPassword } from '../../components/modal-password/modal-password';
import { AuthService } from '../../services/auth-service';
import { UserServices } from '../../services/users/user-services';
import { of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Paciente } from '../../services/models/paciente';
import { AlertBanner } from "../../components/banner/alert-banner/alert-banner";

@Component({
  selector: 'app-edit-paciente',
  imports: [ReactiveFormsModule, AlertBanner],
  templateUrl: './edit-paciente.html',
  styleUrl: './edit-paciente.css'
})
export class EditPaciente {
  private readonly formBuilder = inject(FormBuilder);
  private readonly modalDialog = inject(MatDialog);
  private readonly authServices = inject(AuthService);
  private readonly client = inject(UserServices);

  protected readonly currentUser = this.authServices.currentUserInfo;

  private readonly paciente$ =
    this.currentUser() && this.currentUser()!.id !== undefined
      ? this.client.findByIdPaciente(Number(this.currentUser()!.id))
      : of(null);

  protected readonly signalOdontologo = toSignal(this.paciente$, {
    initialValue: null,
  });

  protected readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', Validators.required],
    apellido:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    domicilio: ['',Validators.required],
    dni: ['',[Validators.required, Validators.minLength(8)]]
  })

    protected readonly fillFormEffect = effect(() => {
      const odontologo = this.signalOdontologo();
      if (!odontologo || !odontologo.users) return;
  
      this.form.patchValue({
        telefono: odontologo.telefono,
        nombre: odontologo.users.nombre,
        apellido: odontologo.users.apellido,
        email: odontologo.users.email,
        dni: odontologo.dni,
        domicilio: odontologo.domicilio,
      });
    });

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
    })
  }

  handleSubmit(){
    const dataForm = this.form.getRawValue();
    const data: Paciente = {
          id: this.signalOdontologo()?.id,
          telefono: dataForm.telefono,
          dni: dataForm.dni,
          domicilio: dataForm.domicilio,
          users: {
            id: this.currentUser()?.id,
            nombre: dataForm.nombre,
            apellido: dataForm.apellido,
            email: dataForm.email
          }
        }
    this.client.updatePaciente(data);
  }
}