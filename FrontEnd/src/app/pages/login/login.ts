import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly formBuilder = inject(FormBuilder)

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  get email(){
    return this.form.controls.email;
  }

  get password(){
    return this.form.controls.password;
  }

  handleSubmit(){
      const user = this.form.getRawValue();
      console.log(user);
  }
}


