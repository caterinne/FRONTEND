import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConvenioService } from 'src/services/convenio.service';

@Component({
  selector: 'app-cu-convenio',
  templateUrl: './cu-convenio.component.html',
  styleUrls: ['./cu-convenio.component.css']
})

export class CUConvenioComponent implements OnInit{
  coordinadores: any;
  selectedIndexIns: number | undefined;
  selectedIndexCoor: number | undefined;
  url = 'http://localhost:3000/api/';


  constructor(private fb: FormBuilder, private convenioService: ConvenioService, 
    private dialogRef:MatDialogRef<CUConvenioComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
  }  
  ngOnInit(): void {
    this.hacerPeticion();
    this.initializeForm();
  }

  onOptionSelected() {
    this.optionsCoor = []
    this.idCoor = []
    console.log("Opción seleccionada:", this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.id_institucion)]);
    this.formulario.id_institucion = this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.id_institucion)]
    this.http.get(this.url+'coordinadores/').subscribe((data: any) => {
      this.coordinadores = data;
      if (Array.isArray(this.coordinadores)) {
        for (let i = 0; i < this.coordinadores.length; i++) {

          if(this.coordinadores[i].ID_Institucion == this.formulario.id_institucion ){
            this.optionsCoor.push(String(this.coordinadores[i].Nombre))
            this.idCoor.push(String(this.coordinadores[i].ID_Coordinador))
          }
        }
      }
    });
  }
  

  optionsInstituciones: string[] = []; 
  optionsCoor: string[] = []; 
  convenios: any[] = [];
  idInstituciones: any[] = [];
  idCoor: any[] = [];
  valorNombre:string |undefined;
  tipoDeFirma: string[] = ['Digital', 'Fisica'];


  formulario = {
    id_institucion: '',
    id_coordinador: '', 
    nombre_conv: '',
    tipo_conv: '',
    vigencia: '',
    ano_firma: '',
    tipo_firma: '',
    cupos: '',
    documentos: '',
  };

  onFormSubmit(formContact: NgForm) {
    if (formContact.valid) {
      if (this.data) {
        // Actualización de convenio
        this.updateConvenio();
      } else {
        // Creación de nuevo convenio
        this.createConvenio();
      }
    }
  }
  private updateConvenio() {
  
    this.convenioService.updateConvenio(this.data.ID_Convenio, this.formulario).subscribe({
      next: (val: any) => {
        alert('Convenio actualizado');
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al actualizar el convenio');
      }
    });
  }
  
  private createConvenio() {
    console.log(this.idCoor[this.optionsCoor.indexOf(this.formulario.id_coordinador)])
    this.formulario.id_coordinador = this.idCoor[this.optionsCoor.indexOf(this.formulario.id_coordinador)]
  
    console.log(this.formulario)
    this.http.post('http://localhost:3000/api/convenios', this.formulario).subscribe(
      (data) => {
        alert('CONVENIO INGRESADO');
        window.location.reload();
        console.log(data);
      },
      (error) => {
        alert('ERROR AL INGRESAR CONVENIO');
        console.error(error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  hacerPeticion() {
    this.http.get(this.url+'nombresInstituciones/').subscribe((data: any) => {
      this.convenios = data;
      if (Array.isArray(this.convenios)) {
        for (let i = 0; i < this.convenios.length; i++) {
          this.optionsInstituciones.push(this.convenios[i].Nombre_Institucion)
          this.idInstituciones.push(this.convenios[i].ID_Institucion)
        }
      }
    });
  }

  initializeForm() {
    this.formulario = {
      id_institucion: this.data?.Nombre_Institucion || '',
      id_coordinador: this.data?.Nombre_Coordinador || '',
      nombre_conv: this.data?.Nombre_Convenio || '',
      tipo_conv: this.data?.Tipo_Convenio || '',
      vigencia: this.data?.Vigencia || '',
      ano_firma: this.data?.Anio_Firma || '',
      tipo_firma: this.data?.Tipo_Firma || '',
      cupos: this.data?.Cupos || '',
      documentos: this.data?.Documentos || '',
    };
  }
}

