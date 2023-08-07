import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestTurnService } from 'src/app/services/request-turn/request-turn.service';
import { TurnModel } from 'src/app/models/turn.model';
import { AccountModel } from 'src/app/models/account.model';
import { LoginService } from 'src/app/services/acount/login.service';

@Component({
  selector: 'app-request-turn',
  templateUrl: './request-turn.component.html',
  styleUrls: ['./request-turn.component.scss']
})
export class RequestTurnComponent {
  titulo = 'Generar turno';
  boton = 'Generar turno';
  errorMessage: string | undefined;
  isGeneratingTurn = false;

  constructor(
    private router: Router,
    private requestTurnService: RequestTurnService,
    private loginService: LoginService
  ) {}

  // Botón
  btnTurn() {
    // Verifica si el usuario está autenticado antes de generar el turno
    if (this.isUserAuthenticated()) {
      // Aquí obtienes el id_cuenta del usuario autenticado
      const id_cuenta: string | undefined = this.getLoggedInUserId();

      if (id_cuenta !== undefined) {
        this.isGeneratingTurn = true; // Activar el indicador de carga o spinner

        // Llama al servicio para obtener el turno
        this.requestTurnService.getAccountTurn(id_cuenta).subscribe(
          (response: TurnModel[]) => {
            // Aquí puedes manejar la respuesta del servicio si es necesario
            console.log('Turnos obtenidos:', response);
            this.isGeneratingTurn = false; // Desactivar el indicador de carga o spinner
            this.router.navigate(['/turn']); // Navega al componente destino solo si la solicitud es exitosa
          },
          (error) => {
            this.isGeneratingTurn = false; // Desactivar el indicador de carga o spinner
            // Manejar el error en caso de que ocurra algún problema en la solicitud
            this.errorMessage = 'Error al obtener los turnos. Inténtalo de nuevo más tarde.';
            console.error('Error al obtener turnos:', error);
          }
        );
      } else {
        // Si no se pudo obtener el id_cuenta del usuario autenticado, muestra un mensaje de error o realiza alguna acción
        this.errorMessage = 'No se pudo obtener el id_cuenta del usuario autenticado.';
      }
    } else {
      // Si el usuario no está autenticado, muestra un mensaje de error o realiza alguna acción
      this.errorMessage = 'Debes iniciar sesión o registrar una cuenta para generar el turno.';
    }
  }

  // Verifica si el usuario está autenticado utilizando el servicio LoginService
  isUserAuthenticated(): boolean {
    // Llama al servicio LoginService para verificar si el usuario está autenticado
    return this.loginService.isUserAuthenticated();
  }

  getLoggedInUserId(): string | undefined {
    const loggedInUser: AccountModel | undefined = this.loginService.getLoggedInUser();
    return loggedInUser ? loggedInUser.id_cuenta?.toString() : undefined;
  }

  // Método para limpiar el mensaje de error
  clearErrorMessage() {
    this.errorMessage = undefined;
  }

  ngOnInit() {
    console.log('¿Usuario autenticado?', this.loginService.isUserAuthenticated());
    console.log('Datos del usuario autenticado:', this.loginService.getLoggedInUser());
  }
}
