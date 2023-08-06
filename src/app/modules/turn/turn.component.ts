import { Component } from '@angular/core';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class TurnComponent {
  cliente = [
    {id:1, turno: 1, persona:'Juan', cuenta:'premium '},
    {id:2, turno: 2, persona:'Juan', cuenta:'premium '},
    {id:3, turno: 3, persona:'Juan', cuenta:'premium '},
    {id:4, turno: 4, persona:'Juan', cuenta:'premium '},
    {id:5, turno: 5, persona:'Juan', cuenta:'premium '},
    {id:6, turno: 6, persona:'Juan', cuenta:'premium '},
    {id:1, turno: 1, persona:'Juan', cuenta:'premium '},
    {id:2, turno: 2, persona:'Juan', cuenta:'premium '},
    {id:3, turno: 3, persona:'Juan', cuenta:'premium '},
    {id:4, turno: 4, persona:'Juan', cuenta:'premium '},
    {id:5, turno: 5, persona:'Juan', cuenta:'premium '},
    {id:1, turno: 1, persona:'Juan', cuenta:'premium '},
    {id:2, turno: 2, persona:'Juan', cuenta:'premium '},
    {id:3, turno: 3, persona:'Juan', cuenta:'premium '},
    {id:4, turno: 4, persona:'Juan', cuenta:'premium '},
    {id:5, turno: 5, persona:'Juan', cuenta:'premium '},
    {id:1, turno: 1, persona:'Juan', cuenta:'premium '},
    {id:2, turno: 2, persona:'Juan', cuenta:'premium '},
    {id:3, turno: 3, persona:'Juan', cuenta:'premium '},
    {id:4, turno: 4, persona:'Juan', cuenta:'premium '},
    {id:5, turno: 5, persona:'Juan', cuenta:'premium '},
    // Puedes agregar más personas aquí
  ];
  
  //funcion cambiar de color
  idClien: number = 3; // recibir id 

  // Método para comprobar si un cliente tiene el mismo que el id que recibe 
  clienteFila(idCliente: number): boolean {
    return idCliente === this.idClien;
  }
}
