import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-convenio',
  templateUrl: './add-convenio.component.html',
  styleUrls: ['./add-convenio.component.css']
})
export class AddConvenioComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }
  coordinadores: any;
  selectedIndexIns: number | undefined;
  selectedIndexCoor: number | undefined;
  url = 'http://localhost:3000/api/';

  optionsInstituciones: string[] = [];
  optionsCoor: string[] = [];
  convenios: any[] = [];
  idInstituciones: any[] = [];
  idCoor: any[] = [];
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



  ngOnInit() {
    this.hacerPeticion();
  }

  onOptionSelected() {
    this.optionsCoor = [];
    this.idCoor = [];
    console.log("Opción seleccionada:", this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.id_institucion)]);
    this.formulario.id_institucion = this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.id_institucion)];
    this.http.get(this.url+'coordinadores/').subscribe((data: any) => {
      this.coordinadores = data;
      if (Array.isArray(this.coordinadores)) {
        for (let i = 0; i < this.coordinadores.length; i++) {
          if(this.coordinadores[i].ID_Institucion == this.formulario.id_institucion) {
            this.optionsCoor.push(String(this.coordinadores[i].Nombre))
            this.idCoor.push(String(this.coordinadores[i].ID_Coordinador))
          }
        }
      }
    });
  }

  addConvenio(formContact: NgForm) {
    console.log(this.idCoor[this.optionsCoor.indexOf(this.formulario.id_coordinador)])
    this.formulario.id_coordinador = this.idCoor[this.optionsCoor.indexOf(this.formulario.id_coordinador)]

    console.log(this.formulario)
    if (formContact.valid) {
      this.http.post('http://localhost:3000/api/convenios', this.formulario).subscribe(
        (data) => {
          alert('CONVENIO INGRESADO');
          this.router.navigate(['/page']);
          console.log(data);
        },
        (error) => {
          alert('ERROR AL INGRESAR CONVENIO');
          console.error(error);
          this.cdr.detectChanges();

        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    }
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
}
