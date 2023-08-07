import { Component, OnInit } from '@angular/core';
import { RequestTurnService } from 'src/app/services/request-turn/request-turn.service';
import { TurnModel } from 'src/app/models/turn.model';
import { LoginService } from 'src/app/services/acount/login.service'; // Importa el servicio LoginService

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss'],
})
export class TurnComponent implements OnInit {
  clientes: TurnModel[] = [];

  constructor(
    private requestTurnService: RequestTurnService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener el id_cuenta del usuario autenticado desde el servicio LoginService
    const currentUser = this.loginService.getLoggedInUser();
    if (currentUser && currentUser.id_cuenta !== undefined) {
      const id_cuenta = currentUser.id_cuenta;
      // Si se pudo obtener el id_cuenta del usuario, llama al servicio para obtener los datos de los clientes
      this.obtenerClientes(id_cuenta);
    } else {
      // Si no se pudo obtener el id_cuenta del usuario, muestra un mensaje de error o realiza alguna acción
      console.error('No se pudo obtener el id_cuenta del usuario.');
    }
  }

  obtenerClientes(id_cuenta: number): void {
    // Llama al servicio para obtener los datos de los clientes usando el id_cuenta
    this.requestTurnService.getAccountTurn(id_cuenta.toString()).subscribe(
      (data: TurnModel[]) => {
        // Verificar si la respuesta es un array antes de usar la función map
        if (Array.isArray(data)) {
          this.clientes = data.map((turn) => {
            return {
              ...turn,
              turno: turn.id_cat_turno?.turno || 'N/A',
              nombre: turn.id_cuenta?.nombre || 'N/A',
              cuenta: turn.id_cuenta?.id_cat_tipo_cuenta?.cuenta || 'N/A'
            };
          });
        } else {
          console.error('La respuesta del servicio no es un array:', data);
          // Manejar el caso en que la respuesta del servicio no sea un array
        }
      },
      (error) => {
        // Manejar el error en caso de que ocurra algún problema en la solicitud
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  // Método para comprobar si un cliente tiene el mismo id que el usuario actual
  clienteFila(idCliente: number): boolean {
    const currentUser = this.loginService.getLoggedInUser();
    return currentUser ? idCliente === currentUser.id_cuenta : false;
  }
}
