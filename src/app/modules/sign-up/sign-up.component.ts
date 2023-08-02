import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Account } from 'src/app/models/account.model'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  Account?: Account;
  frmSignUp!: FormGroup;
  titulo='Crear cuenta';
  boton='Registrar';
  link='Iniciar sesión'

  constructor(private fb: FormBuilder) {}
  //
  ngOnInit(): void {
    this.buildForm();
  }

//construir formulario 
buildForm(): void {
  this.frmSignUp = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });
}
 //funcion enviar
  onSubmit(){
    if(this.frmSignUp?.valid){
      const newAccount: Account = this.frmSignUp.value;
      console.log('Formulario valido');
      console.log(`[REGISTRO] Recibiendo datos del fomrulario ${JSON.stringify(newAccount)}`);
   /* this.productServices.create(newAccount).subscribe((response=> {
      console.log(data);
      this.router.navigate(['console/business/' + this.idBusiness + '/product']);
    });*/
    }
  }


}
