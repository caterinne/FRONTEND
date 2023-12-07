import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

interface Institucion {
  ID_Institucion: number;
  Nombre_Institucion: string;
}

@Component({
  selector: 'app-cu-convenio',
  templateUrl: './cu-convenio.component.html',
  styleUrls: ['./cu-convenio.component.scss']
})
export class CUConvenioComponent implements OnInit {
  @ViewChild('nombreInstSelect') nombreInstSelect!: MatSelect;

  ngAfterViewInit(): void {
    this.selectInitialInstitucion();
  }

  selectInitialInstitucion() {
    const selectedInstitucionId = this.formulario.get('id_institucion')?.value;
    if (selectedInstitucionId) {
      const selectedInstitucion = this.optionsInstituciones.find(inst => inst.ID_Institucion === selectedInstitucionId);

      if (selectedInstitucion) {
        this.nombreInstSelect.value = selectedInstitucion;
      }
    }
  }

  coordinadores: any[] = [];
  selectedIndexIns: number | undefined;
  selectedIndexCoor: number | undefined;
  url = 'http://localhost:3000/api/';

  formulario: FormGroup;
  optionsInstituciones: Institucion[] = [];
  optionsCoor: string[] = [];
  convenios: any[] = [];
  idInstituciones: any[] = [];
  idCoor: any[] = [];
  tipoDeFirma: string[] = ['Digital', 'Fisica'];
  selectedCoor: string | null = '';
  selectedInstitucion: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CUConvenioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private datePipe: DatePipe, private cdRef: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      id_institucion: '',
      id_coordinador: '',
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

  async onOptionSelected() {
    this.optionsCoor = [];
    this.idCoor = [];
    const selectedInstitucionId = this.formulario.value.id_institucion;
    if (selectedInstitucionId) {
      this.formulario.get('id_institucion')?.setValue(selectedInstitucionId);
      await this.updateCoordinadoresOptions(selectedInstitucionId);
    }
  }

private async updateCoordinadoresOptions(selectedInstitucionId: any): Promise<void> {
  console.log('Selected Institucion ID:', selectedInstitucionId);
  return this.http.get(this.url + 'coordinadores/').toPromise().then((data: any) => {
    this.coordinadores = data;
    this.optionsCoor = this.coordinadores
      .filter(coor => coor.ID_Institucion === selectedInstitucionId)
      .map(coor => coor.Nombre);
    this.idCoor = this.coordinadores
      .filter(coor => coor.ID_Institucion === selectedInstitucionId)
      .map(coor => coor.ID_Coordinador);

    console.log('Options Coor:', this.optionsCoor);
    console.log('ID Coor:', this.idCoor);

    this.cdRef.detectChanges();
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
    console.log('Selected Coordinador ID:', this.formulario.value.id_coordinador);
    console.log(this.formulario.value.vigencia);
    console.log(this.formulario.value.ano_firma);
    console.log(this.formulario.value);
    this.http.post('http://localhost:3000/api/convenios', this.formulario.value).subscribe(
      (data) => {
        alert('CONVENIO INGRESADO');
        this.dialogRef.close(true);
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
    this.http.get(`${this.url}nombresInstituciones/`).subscribe(
      (data: any) => {
        this.convenios = data;
        if (Array.isArray(this.convenios)) {
          for (let i = 0; i < this.convenios.length; i++) {
            this.optionsInstituciones.push({
              ID_Institucion: this.convenios[i].ID_Institucion,
              Nombre_Institucion: this.convenios[i].Nombre_Institucion
            });
          }
        }
      },
      (error) => {
        console.error('Error al obtener instituciones:', error);
      }
    );
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


