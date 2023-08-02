import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
  
})
export class SigInComponent  {
  titulo='Iniciar sesión';
  boton='Entrar';
  link='Crear cuenta';
  frmSignIn!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }
  //construir formulario 
buildForm(): void {
  this.frmSignIn = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });
}
  
  onSubmit(){
    if(this.frmSignIn?.valid){
     
    }
  }
}
