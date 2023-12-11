import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { CoordinadorService } from 'src/services/coordinador.service';

@Component({
  selector: 'app-cu-coordinador',
  templateUrl: './cu-coordinador.component.html',
  styleUrls: ['./cu-coordinador.component.scss']
})
export class CUCoordinadorComponent implements OnInit {
  coordinadorForm: FormGroup;

  convenios: any;
  optionsInstituciones: string[] = []; 
  idInstituciones: string[] = []; 
  tipoCord: string[] = ['Interno', 'Externo'];

  constructor(private fb: FormBuilder, private coordinadorService: CoordinadorService, 
    private dialogRef:MatDialogRef<CUCoordinadorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private coreService: CoreService) {
  
    // Verificación para asegurarse de que this.data no sea null
    if (this.data) {
        this.coordinadorForm = this.fb.group({
          id_institucion: this.data.ID_Institucion,
          tipo: this.data.Tipo_Coordinador,
          nombre: this.data.Nombre,
          correo: this.data.Correo,
        });
    } else {
        // Si this.data es null, podrías inicializar el formulario con valores predeterminados o dejar el formulario vacío, dependiendo de tus requisitos.
        this.coordinadorForm = this.fb.group({
          id_institucion: '',
          tipo: '',
          nombre: '',
          correo: '',
        });
    }
  }  
  ngOnInit(): void {
    this.hacerPeticion();
    this.coordinadorForm.patchValue(this.data);
    console.log(this.data);
  }


  onFormSubmit(){
    if(this.coordinadorForm.valid){
      if(this.data){
        this.coordinadorService.updateCoordinador(this.data.ID_Institucion,this.coordinadorForm.value).subscribe({
          next: (val:any) => {
            this.dialogRef.close(true);
            this.coreService.openSnackBar('Coordinador actualizado', 'Aceptar');
            window.location.reload();
          },
          error: (err: any) => {
            this.dialogRef.close(true);
            this.coreService.openSnackBar('Error en actualizar coordinador', 'Aceptar');
            console.error(err);
          }
        });
      } else {
        this.coordinadorService.addCoordinador(this.coordinadorForm.value).subscribe({
          next: (val: any) => {
            id_institucion: this.idInstituciones[this.optionsInstituciones.indexOf(this.coordinadorForm.value.id_institucion)]
            console.log('Respuesta del servidor (addCoordinador):', val);
            this.dialogRef.close(true);
            this.coreService.openSnackBar('Coordinador creado', 'Aceptar');
            window.location.reload();
          },
          error: (err: any) => {
            console.error('Error en addCoordinador:', err);
          }
        });
        
      }
    }
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/';
    this.http.get(url+'nombresInstituciones/').subscribe((data: any) => {
      this.convenios = data;
      if (Array.isArray(this.convenios)) {
        for (let i = 0; i < this.convenios.length; i++) {
          this.optionsInstituciones.push(this.convenios[i].Nombre_Institucion)
          this.idInstituciones.push(this.convenios[i].ID_Institucion)
        }
      }
    });
  }
  formulario = {
    id_institucion: '',
    tipo: '',
    nombre: '',
    correo: '',
  };


  initializeForm() {
    this.formulario = {
      id_institucion: this.data?.ID_Institucion || '',
      tipo: this.data?.Tipo_Coordinador || '',
      nombre: this.data?.Nombre || '',
      correo: this.data?.Correo || '',
    };
  }
}

