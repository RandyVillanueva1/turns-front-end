// sign-up.component.ts
import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AccountModel } from 'src/app/models/account.model';
import { RegistryService } from 'src/app/services/registry/registry.service'; // Importa el servicio
import { Router } from '@angular/router'; // Importa el módulo Router


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  frmSignUp: FormGroup= new FormGroup({});
  titulo='Crear cuenta';
  boton='Registrar';
  link='Iniciar sesión';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private fb: FormBuilder, private registryService: RegistryService, private router: Router) {
  }
  
  ngOnInit(){
    this.buildForm();
  }
 
  buildForm(): void {
    this.frmSignUp = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      id_cat_tipo_cuenta: [2, [Validators.required]],
    });
  }

  onSubmit(){
    if(this.frmSignUp.valid){
      console.log('Formulario valido');
      const account: AccountModel = {
        nombre: this.frmSignUp.value.nombre,
        correo: this.frmSignUp.value.correo,
        contrasena: this.frmSignUp.value.contrasena,
        id_cat_tipo_cuenta: this.frmSignUp.value.id_cat_tipo_cuenta,
      };

      this.registryService.createAccount(account).subscribe(
        (response) => {
          console.log('Cuenta creada:', response);
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.router.navigate(['/request-turn']);
        },
        (error) => {
          console.error('Error al crear la cuenta:', error);
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
        }
      );
    }
  }
}
