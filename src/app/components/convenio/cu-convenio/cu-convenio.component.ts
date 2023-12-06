import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cu-convenio',
  templateUrl: './cu-convenio.component.html',
  styleUrls: ['./cu-convenio.component.css']
})
export class CUConvenioComponent implements OnInit {
  coordinadores: any;
  selectedIndexIns: number | undefined;
  selectedIndexCoor: number | undefined;
  url = 'http://localhost:3000/api/';

  formulario: FormGroup;
  optionsInstituciones: string[] = [];
  optionsCoor: string[] = [];
  convenios: any[] = [];
  idInstituciones: any[] = [];
  idCoor: any[] = [];
  valorNombre: string | undefined;
  tipoDeFirma: string[] = ['Digital', 'Fisica'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CUConvenioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.formulario = this.fb.group({
      id_institucion: '',
      id_coordinador:'',
      nombre_conv: '',
      tipo_conv: '',
      vigencia: '',
      ano_firma: '',
      tipo_firma: '',
      cupos: '',
      documentos: '',
    });
  }  

  ngOnInit(): void {
    this.hacerPeticion();
    this.initializeForm();
  }

  onOptionSelected() {
    this.optionsCoor = [];
    this.idCoor = [];
    console.log("Opción seleccionada:", this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.value.id_institucion)]);
    this.formulario.patchValue({
      id_institucion: this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.value.id_institucion)],
    });

    this.http.get(this.url + 'coordinadores/').subscribe((data: any) => {
      this.coordinadores = data;
      if (Array.isArray(this.coordinadores)) {
        for (let i = 0; i < this.coordinadores.length; i++) {
          if (this.coordinadores[i].ID_Institucion == this.formulario.value.id_institucion) {
            this.optionsCoor.push(String(this.coordinadores[i].Nombre));
            this.idCoor.push(String(this.coordinadores[i].ID_Coordinador));
          }
        }
      }
    });
  }

  onFormSubmit(formulario: FormGroup) {
    if (formulario.valid) {
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
    this.http.put(`http://localhost:3000/api/convenios/${this.data.ID_Convenio}`, this.formulario.value).subscribe({
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
      const formattedVigencia = this.datePipe.transform(this.formulario.value.vigencia, 'dd/MM/yyyy');
      const formattedAnoFirma = this.datePipe.transform(this.formulario.value.ano_firma, 'dd/MM/yyyy');
      this.formulario.patchValue({
        id_coordinador: this.idCoor[this.optionsCoor.indexOf(this.formulario.value.id_coordinador)],
        vigencia: formattedVigencia,
        ano_firma: formattedAnoFirma,
      });
      console.log(this.formulario.value.vigencia);
      console.log(this.formulario.value.ano_firma);

      this.http.post('http://localhost:3000/api/convenios', this.formulario.value).subscribe(
        (data) => {
          alert('CONVENIO INGRESADO');
          window.location.reload();
        },
        (error) => {
          alert('ERROR AL INGRESAR CONVENIO');
          console.error(error);
        });
    }  

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();
  }

  hacerPeticion() {
    this.http.get(this.url + 'nombresInstituciones/').subscribe((data: any) => {
      this.convenios = data;
      if (Array.isArray(this.convenios)) {
        for (let i = 0; i < this.convenios.length; i++) {
          this.optionsInstituciones.push(this.convenios[i].Nombre_Institucion);
          this.idInstituciones.push(this.convenios[i].ID_Institucion);
        }
      }
    });
  }

  initializeForm() {
    this.formulario.patchValue({
      id_institucion: this.data?.Nombre_Institucion || null,
      id_coordinador: this.data?.Nombre_Coordinador || null,
      nombre_conv: this.data?.Nombre_Convenio || null,
      tipo_conv: this.data?.Tipo_Convenio || null,
      vigencia: this.data?.Vigencia || null,
      ano_firma: this.data?.Anio_Firma || null,
      tipo_firma: this.data?.Tipo_Firma || null,
      cupos: this.data?.Cupos || null,
      documentos: this.data?.Documentos || null,
    });
  }
}
      

