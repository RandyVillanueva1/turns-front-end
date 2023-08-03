import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-turn',
  templateUrl: './request-turn.component.html',
  styleUrls: ['./request-turn.component.scss']
})
export class RequestTurnComponent {
  titulo='Generar turno';
  boton='Generar turno';
  constructor(private router: Router) {}
  //boton
  btnTurn() {
    // Navega al componente destino
    this.router.navigate(['/turn']);
  }
}
