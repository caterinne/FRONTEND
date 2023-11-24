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



@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements OnInit {
  displayedColumns: string[] = ['ID_Convenio', 'Alcance','Cupos', 'Pais', 'Nombre_Institucion', 
    'Tipo_Convenio', 'Vigencia', 'Nombre_Coordinador',
    'Correo_Coordinador', 'Tipo_Firma', 'Documentos', 'Action', 

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getConvenioList();
  }
  constructor(private convenio: ConvenioService, private dialog: MatDialog, private router: Router, public loginService: LoginService){}

  getConvenioList(){
    this.convenio.getConvenioList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        console.log(res);
      },
      error: console.log,
    });
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
      this.convenio.deleteConvenio(id).subscribe({
        next: (res) => {
          alert('Convenio Eliminado');
        },
        error: (error) => {
          alert('Convenio Eliminado');
          window.location.reload();
        }
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
    return this.loginService.getUserRole()?.toLowerCase() !== 'no';
  }

  disableOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() === 'no';
  }
}
