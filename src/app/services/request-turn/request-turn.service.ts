import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestTurnService {
  private apiUrl = `${environment.urlApiBackend}account/turn`;

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo turno para un usuario
  registerTurn(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error al registrar el turno: ' + error.message);
      })
    );
  }
}
