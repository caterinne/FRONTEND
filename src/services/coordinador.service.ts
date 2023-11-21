import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {
  constructor(private http: HttpClient) { }
  private Url = 'http://localhost:3000/api/coordinadores';

  addCoordinador(data: any): Observable<any>{
    console.log('Datos en addCoordinador:', data);
    return this.http.post('http://localhost:3000/api/coordinadores', data);
  }
  updateCoordinador(id: number, data: any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/coordinadores/${id}`, data);
  }
  getCoordinadorList(): Observable<any>{
    return this.http.get('http://localhost:3000/api/coordinadores');
  }

  deleteCoordinador(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/coordinadores/${id}`);
  }

}
