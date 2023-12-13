import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { InstitucionService } from 'src/services/institucion.service';

@Component({
  selector: 'app-cu-institucion',
  templateUrl: './cu-institucion.component.html',
  styleUrls: ['./cu-institucion.component.scss']
})
export class CUInstitucionComponent implements OnInit{
  institucionForm: FormGroup;
  alcance: string[] = ['Nacional', 'Internacional'];
  constructor(private fb: FormBuilder, private institucionService: InstitucionService, 
    private dialogRef:MatDialogRef<CUInstitucionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private coreService: CoreService) {
  
    if (this.data) {
        this.institucionForm = this.fb.group({
          nombre_inst: this.data.Nombre_Institucion,
          pais: this.data.Pais,
          tipo_institucion: this.data.Tipo_Institucion,
          unidad_academica: this.data.Unidad_Academica,
          alcance: this.data.Alcance,
        });
    } else {
        this.institucionForm = this.fb.group({
          nombre_inst: '',
          unidad_academica: '',
          pais: '',
          alcance: '',
          tipo_institucion: '',
        });
    }
  }  
  ngOnInit(): void {
    this.institucionForm.patchValue(this.data);
    this.initializeForm();
    console.log(this.data);
  }


  onFormSubmit(){
    if(this.institucionForm.valid){
      if(this.data){
        this.institucionService.updateInstitucion(this.data.id,this.institucionForm.value).subscribe({
          next: (val:any) => {
            this.dialogRef.close(true);
            this.coreService.openSnackBar('Institución actualizada', 'Aceptar');
          },
          error: (err: any) => {
            this.dialogRef.close(true);
            this.coreService.openSnackBar('Institución actualizada', 'Aceptar');
            console.error(err);
          }
        });
      } else {
        this.institucionService.addInstitucion(this.institucionForm.value).subscribe({
          next: (val: any) => {
            console.log('Respuesta del servidor (addInstitucion):', val);
            this.dialogRef.close(true);
            this.coreService.openSnackBar('Institución creada', 'Aceptar');
            window.location.reload();
          },
          error: (err: any) => {
            this.coreService.openSnackBar('ERROR', 'Aceptar');
            console.error('Error en addInstitucion:', err);
          }
        });
        
      }
    }
  }

  formulario = {
    nombre_inst: '',
    unidad_academica: '',
    pais: '',
    alcance: '',
    tipo_institucion: '',
  };

  initializeForm() {
    this.formulario = {
      nombre_inst: this.data?.Nombre_Institucion || '',
      unidad_academica: this.data?.Unidad_Academica || '',
      pais: this.data?.Pais || '',
      alcance: this.data?.Alcance || '',
      tipo_institucion: this.data?.Tipo_Institucion || '',
    };
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}

