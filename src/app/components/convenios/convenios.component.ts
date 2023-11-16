import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent {
  convenios: any[] = []; 
  searchTerm: string = ''

  constructor(private http: HttpClient) { }
  


  ngOnInit() {
    this.hacerPeticion(); 
  }

  filtrarConvenios() {
    return this.convenios.filter(convenio =>
      convenio.Nombre_Convenio.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Convenio.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Vigencia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Anio_Firma.toString().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Firma.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      console.log(this.convenios)
    });
  }
}
