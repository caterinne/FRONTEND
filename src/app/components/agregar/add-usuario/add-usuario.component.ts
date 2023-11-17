import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {
  constructor(private http: HttpClient, private router: Router) { }

  formulario = {
    email: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    vigencia: '',
    privilegios: '',
  };

  agregarUsuarios(formContact: NgForm) {
    if (formContact.valid) {
      this.http.post('http://localhost:3000/api/usuarios/register', this.formulario).subscribe(
        (data) => {
          alert('SE HA INGRESADO EL USUARIO');
          console.log(data);
          // Navegar a otra página después de agregar el usuario
          this.router.navigate(['/page']); // Cambiar 'otra-ruta' a la ruta que desees.
        },
        (error) => {
          alert('ERROR AL INGRESAR EL USUARIO');
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    }
  }
}
