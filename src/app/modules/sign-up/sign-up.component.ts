import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Account } from 'src/app/models/account.model'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  frmSignUp: FormGroup= new FormGroup({});
  titulo='Crear cuenta';
  boton='Registrar';
  link='Iniciar sesión'

  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit(){
    this.buildForm();
  }
 
  buildForm(): void {
    this.frmSignUp = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }
  onSubmit(){
    console.log(this.frmSignUp.valid);
    console.log(this.frmSignUp.value);
    if(this.frmSignUp.valid){
      console.log('Formulario valido');
      const account: Account={
        id_account:0,
        name: this.frmSignUp.value.nombre,
        email: this.frmSignUp.value.correo,
        password: this.frmSignUp.value.contrasena
      }
      //servicio 

    }
  }


}
