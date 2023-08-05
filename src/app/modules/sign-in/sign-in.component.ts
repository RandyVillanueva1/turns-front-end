import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/acount/login.service' // Ruta correcta de tu servicio
import { AccountModel } from 'src/app/models/account.model'; // Ruta correcta de tu modelo
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  frmSignIn!: FormGroup;
  titulo = 'Iniciar sesión';
  boton = 'Entrar';
  link = 'Crear cuenta';
  invalidCredentials = false; // Propiedad para manejar el mensaje de credenciales inválidas

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.createSignInForm();
  }

  ngOnInit(): void {}

  // Crear el formulario de inicio de sesión
  createSignInForm(): void {
    this.frmSignIn = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para procesar el inicio de sesión
  iniciarSesion(): void {
    if (this.frmSignIn.valid) {
      const { correo, contrasena } = this.frmSignIn.value;

      this.loginService.login(correo, contrasena).subscribe(
        (response: any) => {
          if (response && response['Account logged']) {
            // Inicio de sesión exitoso, puedes realizar las acciones necesarias.
            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/request-turn']);
            this.invalidCredentials = false;
          } else if (response && response['Invalid password']) {
            // Credenciales inválidas, muestra un mensaje de error o toma alguna acción.
            console.log('Credenciales inválidas');
            this.invalidCredentials = true;
          } else {
            // Cuenta no encontrada o error desconocido.
            console.log('Error al iniciar sesión');
            this.invalidCredentials = true;
          }
        },
        (error) => {
          // Manejar cualquier error en la solicitud o procesamiento.
          console.error('Error al iniciar sesión', error);
          this.invalidCredentials = true;
        }
      );
    }
  }
}
