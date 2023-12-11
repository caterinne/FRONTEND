import { Component, OnInit, ViewChild} from '@angular/core';
import { ConvenioService } from 'src/services/convenio.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CUConvenioComponent } from './cu-convenio/cu-convenio.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/guards/login.service';
import { CoreService } from 'src/app/core/core.service';
import { DatePipe } from '@angular/common';
import { InformeService } from 'src/services/informe.service';



@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss']
})
export class ConveniosComponent implements OnInit {
  displayedColumns: string[] = ['Estado','Alcance','Cupos', 'Pais', 'Nombre_Institucion', 
    'Tipo_Convenio', 'Vigencia', 'Nombre_Coordinador',
    'Correo_Coordinador', 'Action', 

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getConvenioList();
  }

  constructor(private convenio: ConvenioService, private dialog: MatDialog, private router: Router, public loginService: LoginService, 
    private coreService: CoreService, private datePipe:DatePipe,private informeService: InformeService){}

    getConvenioList() {
      this.convenio.getConvenioList().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
  
        // Envía los datos al servicio de informes
        const totalVigentes = res.filter((convenio: any) => this.estadoVigencia(convenio) === 'Vigente').length;
        const totalPorCaducar = this.getTotalConveniosPorCaducar(res);

        this.informeService.setConveniosVigentes(totalVigentes);
        this.informeService.setConveniosPorCaducar(totalPorCaducar)
  
        // Guarda los datos actualizados en el LocalStorage
        this.guardarDatosEnLocalStorage(totalVigentes, totalPorCaducar);

        console.log(res);
      },
      error: console.log,
    });
  }

  guardarDatosEnLocalStorage(totalVigentes: number, totalPorCaducar: number): void {
    localStorage.setItem('totalVigentes', totalVigentes.toString());
    localStorage.setItem('totalPorCaducar', totalPorCaducar.toString());
    console.log('Datos guardados en el LocalStorage:', { totalVigentes, totalPorCaducar });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConvenio(id: number) {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el convenio con ID ${id}?`);

    if (isConfirmed) {
      fetch(`http://localhost:3000/api/convenios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Agrega cualquier otro encabezado necesario aquí
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar convenio');
        }
        return response.json();
      })
      .then(data => {
        // Aquí puedes manejar la respuesta exitosa si es necesario
        this.coreService.openSnackBar('Convenio eliminado', 'Aceptar');
        this.getConvenioList(); // Actualiza la lista después de la eliminación
      })
      .catch(error => {
        console.error('Error al eliminar convenio:', error);
        this.coreService.openSnackBar('Convenio eliminado', 'Aceptar');
        this.getConvenioList();
      });
    } else {
      alert('Eliminación cancelada');
    }
  }
  

  editConveniosForm(data: any) {
    // Abre el diálogo y pasa los datos para editar
    const dialogRef = this.dialog.open(CUConvenioComponent, {
      data,
    });
  
    // Suscríbete al evento después de cerrar el diálogo
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si result es verdadero, significa que se realizó una actualización
        this.getConvenioList(); // Actualiza la lista después de la edición
      }
    });
  }

  viewDetails(convenio: any): void {
    this.router.navigate(['/convenio-detalle', convenio.ID_Convenio]);
  }

  showOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() !== 'viewer';
  }

  disableOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() === 'viewer';
  }
  estadoVigencia(convenio: any): string {
    const fechaVigencia = new Date(convenio.Vigencia);
    const fechaActual = new Date();

    return fechaActual > fechaVigencia ? 'Caducado' : 'Vigente';
  }
  estadoClass(convenio: any): string {
    return this.estadoVigencia(convenio).toLowerCase();
  }

  cellStyles(convenio: any): any {
    const estado = this.estadoVigencia(convenio);
    return {
      'border-radius': '9px',
      'display': 'inline-block', // Para que el borde rodee el texto
      'padding': '3px',
      'padding-left': estado === 'Caducado' ? '20px' : '20px',  
      'padding-right': estado === 'Caducado' ? '20px' : '35px',
    };
  }

  textStyle(convenio: any): any {
    return {
      'font-weight': this.estadoVigencia(convenio) === 'Caducado' ? '500' : '500', // Puedes ajustar el valor según tus preferencias
    };
  }
}
