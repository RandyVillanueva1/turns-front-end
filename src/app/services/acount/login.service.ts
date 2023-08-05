import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.urlApiBackend}account/login`; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para realizar el inicio de sesión
  login(correo: string, contrasena: string): Observable<any> {
    const data = {
      correo: correo,
      contrasena: contrasena
    };

    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  // Función para obtener las cabeceras para la solicitud HTTP (si es necesario)
  getHeaders(): HttpHeaders {
    // Aquí puedes agregar cualquier cabecera necesaria, por ejemplo, token de autenticación.
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return headers;
  }
}
