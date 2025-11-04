import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-password',
  imports: [],
  templateUrl: './modal-password.html',
  styleUrl: './modal-password.css'
})
export class ModalPassword {
  private readonly formBuilder = inject(FormBuilder)
  private readonly matDialog = inject(MatDialogRef)

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


  close() {
    this.matDialog.close()
  }

  handleSubmit(){
    const data = this.form.getRawValue()
    console.log(data)
  }

}
