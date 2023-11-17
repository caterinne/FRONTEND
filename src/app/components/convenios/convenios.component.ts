import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConvenioDetalleComponent } from './convenio-detalle/convenio-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { EditConvenioComponent } from '../editar/edit-convenio/edit-convenio.component';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent {
  convenios: any[] = []; 
  searchTerm: string = ''

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  


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
  verDetalles(event: Event, convenio: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConvenioDetalleComponent, {
      width: '500px', 
      data: { convenio: convenio },
      hasBackdrop: true, // Esta opción permite cerrar el modal haciendo clic fuera de él
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  editarConvenio(event: Event, convenio: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditConvenioComponent, {
      width: '400px',
      data: { convenio: convenio }
    });
  }
  
}
