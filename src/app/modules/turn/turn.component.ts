import { Component, OnInit } from '@angular/core';
import { TurnService } from 'src/app/services/turn/turn.service'; // Importa el servicio TurnService
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
    private turnService: TurnService, // Cambia el nombre del servicio aquí
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
    // Llama al servicio para obtener la lista de turnos usando el id_cuenta
    this.turnService.getTurns().subscribe(
      (data: any) => {
        // Verificar si la respuesta contiene tres arrays como se espera
        if (Array.isArray(data) && data.length === 3) {
          const [turnos, cuentas, catTurnos] = data;
          this.clientes = turnos.map((turnoData: any) => {
            const id_turno = turnoData.id_turno;
            const id_cuenta = cuentas.find((cuenta: any) => cuenta.id_cuenta === turnoData.id_cuenta);
            const id_cat_turno = catTurnos.find((catTurno: any) => catTurno.id_cat_turno === turnoData.id_cat_turno);
            return {
              id_turno,
              id_cuenta,
              id_cat_turno,
              turno: id_cat_turno?.turno || 'N/A',
              nombre: id_cuenta?.nombre || 'N/A',
              cuenta: id_cuenta?.id_cat_tipo_cuenta?.cuenta || 'N/A',
            };
          });
        } else {
          console.error('La respuesta del servicio no tiene el formato esperado:', data);
        }
        console.log(this.clientes)
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
