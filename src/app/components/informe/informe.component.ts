import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformeService } from 'src/services/informe.service';
import { VigenteModalComponent } from './vigente-modal/vigente-modal.component';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CaducadoModalComponent } from './caducado-modal/caducado-modal.component';
import { ConvenioService } from 'src/services/convenio.service';
import { NacionalModalComponent } from './nacional-modal/nacional-modal.component';
import { InternacionalModalComponent } from './internacional-modal/internacional-modal.component';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent {
  totalConveniosVigentes: number = 0;
  totalConveniosPorCaducar: number = 0;
  totalConveniosNacionales: number = 0;
  totalConveniosInternacionales: number = 0;

  constructor(
    private informeService: InformeService,
    private dialog: MatDialog,
    private http: HttpClient,
    private convenio: ConvenioService
  ) {}

  apiUrl = 'http://localhost:3000/api';

  ngOnInit(): void {
    this.getConvenioList();
    this.informeService.conveniosVigentes$.subscribe((total) => {
      this.totalConveniosVigentes = total;
    });
    this.informeService.conveniosPorCaducar$.subscribe((total) => {
      this.totalConveniosPorCaducar = total;
    });
    this.informeService.conveniosNacionales$.subscribe((total) => {
      this.totalConveniosNacionales = total;
    });
    this.informeService.conveniosInternacionales$.subscribe((total) => {
      this.totalConveniosInternacionales = total;
    });
  }

  estadoVigencia(convenio: any): string {
    const fechaVigencia = new Date(convenio.Vigencia);
    const fechaActual = new Date();

    return fechaActual > fechaVigencia ? 'Caducado' : 'Vigente';
  }

  getConveniosVigentes(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`).pipe(
      map((data) => data.filter((convenio) => this.estadoVigencia(convenio) === 'Vigente'))
    );
  }

  getConveniosCaducados(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`).pipe(
      map((data) =>
        data.filter((convenio) => this.estadoVigencia(convenio) === 'Vigente' && this.caducaEnProximos7Dias(convenio))
      )
    );
  }

  getConveniosNacionales(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`).pipe(
      map((data) => data.filter((convenio) => convenio.Alcance === 'Nacional'))
    );
  }
  getConveniosInternacionales(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`).pipe(
      map((data) => data.filter((convenio) => convenio.Alcance === 'Internacional'))
    );
  }
  

  openConveniosVigentesModal() {
    this.getConveniosVigentes().subscribe((conveniosVigentes) => {
      this.dialog.open(VigenteModalComponent, {
        data: { convenios: conveniosVigentes },
      });
    });
  } 
  openConveniosCaducadosModal() {
    this.getConveniosCaducados().subscribe((conveniosPorCaducar) => {
      this.dialog.open(CaducadoModalComponent, {
        data: { convenios: conveniosPorCaducar },
      });
    });
  }
  openConveniosNacionalModal() {
    this.getConveniosNacionales().subscribe((conveniosNacionales) => {
      this.dialog.open(NacionalModalComponent, {
        data: { convenios: conveniosNacionales },
      });
    });
  } 
  openConveniosInternacionalModal() {
    this.getConveniosInternacionales().subscribe((conveniosInternacionales) => {
      this.dialog.open(InternacionalModalComponent, {
        data: { convenios: conveniosInternacionales },
      });
    });
  } 
  getConvenioList() {
    this.convenio.getConvenioList().subscribe({
      next: (res) => {
        const totalVigentes = res.filter((convenio: any) => this.estadoVigencia(convenio) === 'Vigente').length;
        const totalPorCaducar = this.getTotalConveniosPorCaducar(res);
  
        this.getTotalConveniosNacionales().subscribe((totalNacionales: number) => {
          this.getTotalConveniosInternacionales().subscribe((totalInternacionales: number) => {
            this.informeService.setConveniosVigentes(totalVigentes);
            this.informeService.setConveniosPorCaducar(totalPorCaducar);
            this.informeService.setConveniosNacionales(totalNacionales);
            this.informeService.setConveniosInternacionales(totalInternacionales);
  
            this.guardarDatosEnLocalStorage(totalVigentes, totalPorCaducar, totalNacionales, totalInternacionales);
          });
        });
      },
      error: console.log,
    });
  }
  
  guardarDatosEnLocalStorage(totalVigentes: number, totalPorCaducar: number, totalNacionales: number, totalInternacionales: number): void {
    localStorage.setItem('totalVigentes', totalVigentes.toString());
    localStorage.setItem('totalPorCaducar', totalPorCaducar.toString());
    localStorage.setItem('totalNacionales', totalNacionales.toString());
    localStorage.setItem('totalInternacionales', totalInternacionales.toString());
  }

  getTotalConveniosPorCaducar(convenios: any[]): number {
    const diasAntesDeCaducar = 7; 

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return convenios.filter((convenio: any) => {
      const fechaVigencia = new Date(convenio.Vigencia);
      const diasRestantes = Math.floor((fechaVigencia.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

      return diasRestantes <= diasAntesDeCaducar && diasRestantes >= 0;
    }).length;
  }

  getTotalConveniosNacionales(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`).pipe(
      map((data) => data.filter((convenio) => convenio.Alcance === 'Nacional').length)
    );
  }  
  getTotalConveniosInternacionales(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`).pipe(
      map((data) => data.filter((convenio) => convenio.Alcance === 'Internacional').length)
    );
  } 
    caducaEnProximos7Dias(convenio: any): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaVigencia = new Date(convenio.Vigencia);
    const diasRestantes = Math.floor((fechaVigencia.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    return diasRestantes <= 7 && diasRestantes >= 0;
  }
}

