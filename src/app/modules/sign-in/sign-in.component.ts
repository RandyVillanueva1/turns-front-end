import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
  
})
export class SigInComponent  {
  frmSignIn: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    // Crea el FormGroup y define los controles con sus validaciones
    this.frmSignIn= this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }
  onSubmit(){
    console.log(this.frmSignIn)
  }
}
