import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../evironments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiUrl}/admins`;

  constructor(private http: HttpClient) {}

  registrar(admin: any): Observable<any> {
    return this.http.post(this.apiUrl, admin);
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/roles`);
  }
}
