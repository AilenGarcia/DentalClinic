import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AlertBanner } from "../../components/banner/alert-banner/alert-banner";
import { AlertServices } from '../../services/alert-services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog-component/confirm-dialog-component';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink, AlertBanner],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})

export class Signin {
  message: string | null = null;
  type: 'success' | 'error' | '' = '';
  private readonly formBuilder = inject(FormBuilder);
  private readonly client = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly alertService = inject(AlertServices);

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
    rolId: [2, [Validators.required]]
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

  get rolId() { return this.form.get('rolId')!; }

handleSubmit() {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      title: 'Confirmar registro',
      message: '¿Desea confirmar los datos?',
    },
  });

  dialogRef.afterClosed().subscribe((confirmed) => {
    if (confirmed) {
      const user = this.form.getRawValue();
      this.client.register(user);
    }
  });
}

}
