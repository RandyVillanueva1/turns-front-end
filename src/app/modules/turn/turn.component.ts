import { Component, OnInit } from '@angular/core';
import { TurnService } from 'src/app/services/turn/turn.service';
import { TurnModel } from 'src/app/models/turn.model';
import { LoginService } from 'src/app/services/acount/login.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss'],
})
export class TurnComponent implements OnInit {
  clientes: TurnModel[] = [];

  constructor(
    private turnService: TurnService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const currentUser = this.loginService.getLoggedInUser();
    if (currentUser && currentUser.id_cuenta !== undefined) {
      const id_cuenta = currentUser.id_cuenta;
      this.obtenerClientes(id_cuenta);
    } else {
      console.error('No se pudo obtener el id_cuenta del usuario.');
    }
  }

  obtenerClientes(id_cuenta: number): void {
    this.turnService.getTurns().subscribe(
      (data: any[]) => {
        if (Array.isArray(data) && data.length === 4) {
          const [turnos, cuentas, catTurnos, catTiposCuenta] = data;
          this.clientes = turnos.map((turnoData: any) => {
            const id_turno = turnoData.id_turno;
            const id_cuenta = cuentas.find((cuenta: any) => cuenta.id_cuenta === turnoData.id_cuenta);
            const id_cat_turno = catTurnos.find((catTurno: any) => catTurno.id_cat_turno === turnoData.id_cat_turno);
            const id_cat_tipo_cuenta = catTiposCuenta.find((tipoCuenta: any) => tipoCuenta.id_cat_tipo_cuenta === id_cuenta.id_cat_tipo_cuenta);

            let cuentaString = 'N/A';
            if (id_cat_tipo_cuenta) {
              if (id_cat_tipo_cuenta.id_cat_tipo_cuenta === 1) {
                cuentaString = 'ninguna';
              } else if (id_cat_tipo_cuenta.id_cat_tipo_cuenta === 2) {
                cuentaString = 'premium';
              } else if (id_cat_tipo_cuenta.id_cat_tipo_cuenta === 3) {
                cuentaString = 'cuenta';
              }
            }

            return {
              id_turno,
              id_cuenta,
              id_cat_turno,
              id_cat_tipo_cuenta: cuentaString,
            };
          });

          // Llamar al método para ordenar los clientes con el tipo de cuenta "premium" primero
          this.ordenarClientesPremiumPrimero();
        } else {
          console.error('La respuesta del servicio no tiene el formato esperado:', data);
        }
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  ordenarClientesPremiumPrimero(): void {
    // Filtrar los clientes con tipo de cuenta "premium" (valor numérico 3)
    const clientesPremium = this.clientes.filter(cliente => cliente.id_cat_tipo_cuenta === 3);

    // Filtrar los clientes con tipo de cuenta diferente de "premium" (cualquier otro valor)
    const clientesNoPremium = this.clientes.filter(cliente => cliente.id_cat_tipo_cuenta !== 3);

    // Concatenar ambos arrays, colocando los clientes premium primero
    this.clientes = [...clientesPremium, ...clientesNoPremium];
  }
}
