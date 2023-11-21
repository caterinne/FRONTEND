import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  constructor(private http: HttpClient) { }

  addInstitucion(data: any): Observable<any>{
    console.log('Datos en addInstitucion:', data);
    return this.http.post('http://localhost:3000/api/instituciones', data);
  }
  updateInstitucion(id: number, data: any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/instituciones/${id}`, data);
  }
  getInstitucionList(): Observable<any>{
    return this.http.get('http://localhost:3000/api/instituciones');
  }

  deleteInstitucion(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/instituciones/${id}`);
  }
}
