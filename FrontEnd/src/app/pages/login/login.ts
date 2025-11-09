import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AlertBanner } from "../../components/banner/alert-banner/alert-banner";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AlertBanner],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly client = inject(AuthService)

  protected readonly form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  get username(){
    return this.form.controls.username;
  }

  get password(){
    return this.form.controls.password;
  }

  handleSubmit(){
      const user = this.form.getRawValue();
      this.client.login(user);
  }
}


