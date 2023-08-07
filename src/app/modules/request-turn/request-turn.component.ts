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
        // Llama al servicio para registrar el turno
        this.requestTurnService.registerTurn(id_cuenta).subscribe(
          (response) => {
            // Aquí puedes manejar la respuesta del servicio si es necesario
            console.log('Turno registrado:', response);
          },
          (error) => {
            // Manejar el error en caso de que ocurra algún problema en la solicitud
            console.error('Error al registrar turno:', error);
          }
        );

        // Navega al componente destino (opcional)
        this.router.navigate(['/turn']);
      } else {
        // Si no se pudo obtener el id_cuenta del usuario autenticado, muestra un mensaje de error o realiza alguna acción
        console.error('No se pudo obtener el id_cuenta del usuario autenticado.');
      }
    } else {
      // Si el usuario no está autenticado, muestra un mensaje de error o realiza alguna acción
      console.error('Debes iniciar sesión o registrar una cuenta para generar el turno.');
    }
  }

  // Verifica si el usuario está autenticado utilizando el servicio LoginService
  isUserAuthenticated(): boolean {
    // Llama al servicio LoginService para verificar si el usuario está autenticado
    return this.loginService.isUserAuthenticated();
  }

  // Obtiene el id_cuenta del usuario autenticado desde el servicio LoginService
  getLoggedInUserId(): string | undefined {
    const loggedInUser: AccountModel | undefined = this.loginService.getLoggedInUser();
    return loggedInUser ? loggedInUser.id_cuenta?.toString() : undefined;
  }

  ngOnInit() {
    // Mostrar información del usuario autenticado al inicializar el componente (opcional)
    console.log('¿Usuario autenticado?', this.loginService.isUserAuthenticated());
    console.log('Datos del usuario autenticado:', this.loginService.getLoggedInUser());
  }
}
