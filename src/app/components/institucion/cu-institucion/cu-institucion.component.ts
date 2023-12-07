import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstitucionService } from 'src/services/institucion.service';

@Component({
  selector: 'app-cu-institucion',
  templateUrl: './cu-institucion.component.html',
  styleUrls: ['./cu-institucion.component.scss']
})
export class CUInstitucionComponent implements OnInit{
  institucionForm: FormGroup;

  constructor(private fb: FormBuilder, private institucionService: InstitucionService, 
    private dialogRef:MatDialogRef<CUInstitucionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  
    // Verificación para asegurarse de que this.data no sea null
    if (this.data) {
        this.institucionForm = this.fb.group({
          nombre_inst: this.data.Nombre_Institucion,
          pais: this.data.Pais,
          tipo_institucion: this.data.Tipo_Institucion,
          unidad_academica: this.data.Unidad_Academica,
          alcance: this.data.Alcance,
        });
    } else {
        // Si this.data es null, podrías inicializar el formulario con valores predeterminados o dejar el formulario vacío, dependiendo de tus requisitos.
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
            alert('Institución actualizada');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            alert('Institución actualizada');
            this.dialogRef.close(true);
          }
        });
      } else {
        this.institucionService.addInstitucion(this.institucionForm.value).subscribe({
          next: (val: any) => {
            console.log('Respuesta del servidor (addConvenio):', val);
            alert('Institución creada con éxito. ID: ' + val.id_institucion);
            this.dialogRef.close(true);
            window.location.reload();
          },
          error: (err: any) => {
            console.error('Error en addConvenio:', err);
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
    // Asegúrate de tener lógica para inicializar el formulario con los datos existentes
    this.formulario = {
      nombre_inst: this.data?.Nombre_Institucion || '',
      unidad_academica: this.data?.Unidad_Academica || '',
      pais: this.data?.Pais || '',
      alcance: this.data?.Alcance || '',
      tipo_institucion: this.data?.Tipo_Institucion || '',
    };
  }
}
