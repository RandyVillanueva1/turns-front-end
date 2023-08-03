import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
  
})
export class SigInComponent  {
  frmSignIn!: FormGroup;
  titulo='Iniciar sesión';
  boton='Entrar';
  link='Crear cuenta';

  constructor(private fb: FormBuilder) {} 

  ngOnInit(){
    this.buildForm();
  }

  buildForm(): void {
    this.frmSignIn = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }
  
  onSubmit() {
    if (this.frmSignIn.valid) {
      const username = this.frmSignIn.value.correo;
      const password = this.frmSignIn.value.contrasena;

      // servicio
      if (username === 'galleta@gmail.com' && password === '12345') {
        // Aquí redireccionas al usuario a la página de inicio o al dashboard
        console.log('Inicio de sesión exitoso');
      } else {
        console.log('Credenciales inválidas');
      }
    }
  }
}
