import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServices } from '../../services/users/user-services';
import { ChangePassword } from '../../services/models/change-password';
import { AuthService } from '../../services/auth-service';
import { AlertServices } from '../../services/alert-services';
import { AlertBanner } from "../banner/alert-banner/alert-banner";

@Component({
  selector: 'app-modal-password',
  imports: [ReactiveFormsModule, AlertBanner],
  templateUrl: './modal-password.html',
  styleUrl: './modal-password.css'
})
export class ModalPassword {
  private readonly alertService = inject(AlertServices);
  private readonly formBuilder = inject(FormBuilder)
  private readonly matDialog = inject(MatDialogRef)
  private readonly authService = inject(AuthService);
  protected readonly currentUser = this.authService.currentUserInfo;
  private readonly client = inject(UserServices)

  protected readonly form = this.formBuilder.nonNullable.group({
    oldPassword:['', Validators.required],
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

  get oldPassword(){
    return this.form.controls.oldPassword;
  }

    get password(){
    return this.form.controls.password;
  }

  get passwordConfirm(){
    return this.form.controls.passwordConfirm;
  }

  showPasswordOld = false;

  showPasswordNew = false;

  togglePasswordOld() {
    this.showPasswordOld = !this.showPasswordOld;
  }

    togglePasswordNew() {
    this.showPasswordNew = !this.showPasswordNew;
  }

  close() {
    this.matDialog.close()
  }

handleSubmit() {
  const currentUser = this.currentUser();
  if (!currentUser?.email) {
    console.error('No hay usuario autenticado');
    return;
  }

  const dataForm = this.form.getRawValue();
  const data: ChangePassword = {
    email: currentUser.email,
    oldPassword: dataForm.oldPassword,
    newPassword: dataForm.password
  };

  this.client.changePassword(data).subscribe({
    next: () => {
      this.alertService.showMessage('Contraseña modificada exitosamente', 'success');

        setTimeout(() => {
          this.close()
        }, 2000);
    },
    error: (err) => {
      this.alertService.showMessage('Error al modificar contraseña', 'error');
      console.error('Error al cambiar la contraseña:', err);
    }
  });
}


}
