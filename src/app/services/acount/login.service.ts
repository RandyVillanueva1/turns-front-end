// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.urlApiBackend}account/login`;
  private currentUser: AccountModel | undefined;

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    const data = {
      correo: correo,
      contrasena: contrasena
    };

    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  setCurrentUser(user: AccountModel) {
    this.currentUser = user;
  }

  isUserAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getLoggedInUser(): AccountModel | undefined {
    return this.currentUser;
  }
}
