import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalPassword } from '../../components/modal-password/modal-password';
import { AuthService } from '../../services/auth-service';
import { UserServices } from '../../services/users/user-services';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Odontologo } from '../../services/models/odontologo';
import { AlertBanner } from "../../components/banner/alert-banner/alert-banner";

@Component({
  selector: 'app-edit-odontologo',
  imports: [ReactiveFormsModule, AlertBanner],
  templateUrl: './edit-odontologo.html',
  styleUrl: './edit-odontologo.css',
})
export class EditOdontologo {
  private readonly formBuilder = inject(FormBuilder);
  private readonly modalDialog = inject(MatDialog);
  private readonly authServices = inject(AuthService);
  private readonly client = inject(UserServices);

  protected readonly currentUser = this.authServices.currentUserInfo;

  private readonly odontologo$ =
    this.currentUser() && this.currentUser()!.id !== undefined
      ? this.client.findByIdOdontologo(Number(this.currentUser()!.id))
      : of(null);

  protected readonly signalOdontologo = toSignal(this.odontologo$, {
    initialValue: null,
  });

  protected readonly form = this.formBuilder.nonNullable.group({
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    matricula: ['', [Validators.required, Validators.minLength(8)]],
    descripcion: ['', Validators.required],
  });

  protected readonly fillFormEffect = effect(() => {
    const odontologo = this.signalOdontologo();
    if (!odontologo || !odontologo.users) return;

    this.form.patchValue({
      telefono: odontologo.telefono,
      nombre: odontologo.users.nombre,
      apellido: odontologo.users.apellido,
      email: odontologo.users.email,
      matricula: odontologo.matricula,
      descripcion: odontologo.descripcion,
    });
  });

  get telefono() {
    return this.form.controls.telefono;
  }
  get nombre() {
    return this.form.controls.nombre;
  }
  get apellido() {
    return this.form.controls.apellido;
  }
  get email() {
    return this.form.controls.email;
  }
  get matricula() {
    return this.form.controls.matricula;
  }
  get descripcion() {
    return this.form.controls.descripcion;
  }

  openModal() {
    const dialogRef = this.modalDialog.open(ModalPassword);
    dialogRef.afterClosed().subscribe(() => { });
  }

  handleSubmit() {
    const dataForm = this.form.getRawValue();
    const data: Odontologo = {
      id: this.signalOdontologo()?.id,
      telefono: dataForm.telefono,
      matricula: dataForm.matricula,
      descripcion: dataForm.descripcion,
      users: {
        id: this.currentUser()?.id,
        nombre: dataForm.nombre,
        apellido: dataForm.apellido,
        email: dataForm.email
      }
    }
    this.client.updateOdontologo(data);
  }
}
