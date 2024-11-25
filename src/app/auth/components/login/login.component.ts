import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl("ela@mail.com",[Validators.email, Validators.required]),
    password: new FormControl("11111", Validators.required)
  })

  funIngresar(){
    alert("Ingresando.....")
  }

}
