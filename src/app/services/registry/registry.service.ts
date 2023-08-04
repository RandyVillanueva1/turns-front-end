// account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  private apiUrl =  `${environment.urlApiBackend}account/registry`; // Reemplaza esto con la URL de tu servicio POST

  constructor(private http: HttpClient) {}

  createAccount(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(this.apiUrl, account);
  }
}
