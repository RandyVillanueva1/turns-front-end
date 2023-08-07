// sign-in.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/acount/login.service';
import { AccountModel } from 'src/app/models/account.model';
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
  invalidCredentials = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.createSignInForm();
  }

  ngOnInit(): void {}

  createSignInForm(): void {
    this.frmSignIn = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  iniciarSesion(): void {
    if (this.frmSignIn.valid) {
      const { correo, contrasena } = this.frmSignIn.value;

      this.loginService.login(correo, contrasena).subscribe(
        (response: any) => {
          if (response && response['Account logged']) {
            const user: AccountModel = {
              id_cuenta: response['id_account'], // Cambiar clave a 'id_account'
              nombre: response['nombre'],
              correo: response['correo'],
              id_cat_tipo_cuenta: response['id_cat_tipo_cuenta'] // Agregar la propiedad id_cat_tipo_cuenta
            };
            this.loginService.setCurrentUser(user);

            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/request-turn']);
            this.invalidCredentials = false;
          } else if (response && response['Invalid password']) {
            console.log('Credenciales inválidas');
            this.invalidCredentials = true;
          } else {
            console.log('Error al iniciar sesión');
            this.invalidCredentials = true;
          }
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
          this.invalidCredentials = true;
        }
      );
    }
  }
}
