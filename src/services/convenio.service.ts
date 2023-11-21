import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  addConvenio(data: any): Observable<any>{
    return this.http.post('http://localhost:3000/api/convenios', data);
  }
  updateConvenio(id: number, data: any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/convenios/${id}`, data);
  }
  getConvenioList(): Observable<any>{
    return this.http.get('http://localhost:3000/api/convenios');
  }

  deleteConvenio(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/convenios/${id}`);
  }
  

  getConvenioDetails(convenioId: string): Observable<any> {
    // Implementa la lógica para obtener los detalles del convenio por su ID
    const url = `${this.apiUrl}/convenios/${convenioId}`; // Reemplaza con la URL real de tu API
    return this.http.get<any>(url);
  }

}
