import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-institucion',
  templateUrl: './add-institucion.component.html',
  styleUrls: ['./add-institucion.component.css']
})
export class AddInstitucionComponent {
  constructor(private http: HttpClient, private router: Router) { }

  formulario = {
    nombre_inst: '',
    unidad_academica: '',
    pais: '',
    alcance: '',
    tipo_institucion: '',
  };

  agregarInstitucion(formContact: NgForm) {
    if (this.formulario.pais !== 'Chile') {
      this.formulario.alcance = 'Internacional';
    } else {
      this.formulario.alcance = 'Nacional';
    }

    if (formContact.valid) {
      this.http.post('http://localhost:3000/api/instituciones', this.formulario).subscribe(
        (data) => {
          alert('SE HA INGRESADO INSTITUCIÓN');
          this.router.navigate(['/page']);
          console.log(data);
        },
        (error) => {
          alert('ERROR AL INGRESAR INSTITUCIÓN');
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    }
  }
}
