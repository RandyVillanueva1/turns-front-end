import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TurnModel } from 'src/app/models/turn.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurnService {
  private apiUrl = `${environment.urlApiBackend}account/listurn`;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de turnos
  getTurns(): Observable<TurnModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => this.extractTurns(data)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error al obtener la lista de turnos: ' + error.message);
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
