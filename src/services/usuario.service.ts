import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/api'

  addUsuario(data: any): Observable<any>{
    console.log('Datos en addInstitucion:', data);
    return this.http.post('http://localhost:3000/api/usuarios/register', data);
  }
  updateUsuario(id: number, data: any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/usuarios/${id}`, data);
  }
  getUsuarioList(): Observable<any>{
    return this.http.get('http://localhost:3000/api/usuarios');
  }

  deleteUsuario(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/usuarios/${id}`);
  }
}
