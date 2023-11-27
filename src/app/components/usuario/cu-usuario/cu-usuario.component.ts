import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-cu-usuario',
  templateUrl: './cu-usuario.component.html',
  styleUrls: ['./cu-usuario.component.css']
})
export class CUUsuarioComponent {
  usuarioForm: FormGroup;
  privilegios: string[] = ['Admin', 'User', 'Viewer'];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, 
    private dialogRef:MatDialogRef<CUUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  
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
            alert('Institución actualizada');
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
            alert('Institución creada con éxito. ID: ' + val.id_usuario);
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
