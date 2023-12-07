import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-cu-usuario',
  templateUrl: './cu-usuario.component.html',
  styleUrls: ['./cu-usuario.component.scss']
})
export class CUUsuarioComponent {
  usuarioForm: FormGroup;
  privilegios: string[] = ['Admin', 'User', 'Viewer'];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, 
    private dialogRef:MatDialogRef<CUUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private coreService: CoreService) {
  
    // Verificación para asegurarse de que this.data no sea null
    if (this.data) {
        this.usuarioForm = this.fb.group({
          email: this.data.email,
          contrasena: this.data.contrasena,
          nombre: this.data.nombre,
          apellido: this.data.apellido,
          privilegios: this.data.privilegios
        });
    } else {
        // Si this.data es null, podrías inicializar el formulario con valores predeterminados o dejar el formulario vacío, dependiendo de tus requisitos.
        this.usuarioForm = this.fb.group({
          email: '',
          contrasena: '',
          nombre: '',
          apellido: '',
          privilegios: ''
        });
    }
  }  
  ngOnInit(): void {
    this.usuarioForm.patchValue(this.data);
    console.log(this.data);
  }


  onFormSubmit(){
    if(this.usuarioForm.valid){
      if(this.data){
        this.usuarioService.updateUsuario(this.data.ID_Institucion,this.usuarioForm.value).subscribe({
          next: (val:any) => {
            this.coreService.openSnackBar('Usuario Actualizado', 'Aceptar');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.usuarioService.addUsuario(this.usuarioForm.value).subscribe({
          next: (val: any) => {
            console.log('Respuesta del servidor (addConvenio):', val);
            this.coreService.openSnackBar(('Usuario ' + val.nombre + ' ' + val.apellido + ' creado'), 'Aceptar');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error en addConvenio:', err);
          }
        });
        
      }
    }
  }
}
