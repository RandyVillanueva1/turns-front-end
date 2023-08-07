import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TurnModel } from 'src/app/models/turn.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestTurnService {
  private apiUrl = `${environment.urlApiBackend}account/turn`;

  constructor(private http: HttpClient) {}

  getAccountTurn(id: string): Observable<TurnModel[]> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url).pipe(
      map((data) => this.extractTurns(data)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error al obtener el turno: ' + error.message);
      })
    );
  }

  private extractTurns(data: any): TurnModel[] {
    if (Array.isArray(data)) {
      return data as TurnModel[];
    } else if (data && Array.isArray(data.turnos)) {
      return data.turnos as TurnModel[];
    } else {
      console.error('Respuesta del servidor inválida:', data);
      return [];
    }
  }
}
