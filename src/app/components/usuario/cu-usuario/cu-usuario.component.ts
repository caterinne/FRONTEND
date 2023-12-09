import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioComponent } from '../usuario.component';

@Component({
  selector: 'app-cu-usuario',
  templateUrl: './cu-usuario.component.html',
  styleUrls: ['./cu-usuario.component.scss']
})
export class CUUsuarioComponent {
  usuarioForm: FormGroup;
  privilegios: string[] = ['Admin', 'User', 'Viewer'];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, 
    private dialogRef:MatDialogRef<CUUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
    private coreService: CoreService) {
  
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
    this.initializeForm();
    console.log(this.data);
  }


  onFormSubmit(){
    if(this.usuarioForm.valid){
      if(this.data){
        console.log(this.data.ID_Usuario)
        this.usuarioService.updateUsuario(this.data.ID_Usuario,this.usuarioForm.value).subscribe({
          next: (val) => {
            this.coreService.openSnackBar('Usuario Actualizado', 'Aceptar');
            this.dialogRef.close(true);
            window.location.reload();
          },
          error: (err) => {
            this.coreService.openSnackBar('Usuario Actualizado', 'Aceptar');
            this.dialogRef.close(true);
            window.location.reload();
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
  initializeForm() {
    this.usuarioForm.patchValue({
      email: this.data?.Email || null,
      contrasena: this.data?.Contrasena || null,
      nombre: this.data?.Nombre || null,
      apellido: this.data?.Apellido || null,
      privilegios: this.data?.Privilegios || null
    });
  }
}
