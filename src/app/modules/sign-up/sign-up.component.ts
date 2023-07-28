import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  frmSignUp: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    // Crea el FormGroup y define los controles con sus validaciones
    this.frmSignUp= this.formBuilder.group({
      nombre:['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }
  onSubmit(){
    console.log(this.frmSignUp)
  }
}
