import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InstitucionService } from 'src/services/institucion.service';
import { CUInstitucionComponent } from './cu-institucion/cu-institucion.component';
import { LoginService } from 'src/guards/login.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.scss']
})
export class InstitucionComponent implements OnInit{
  displayedColumns: string[] = ['Alcance','Nombre_Institucion','Unidad_Academica', 'Pais','Tipo_Institucion', 'Action', 

];
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getInstitucionList();
  }
  constructor(private institucion: InstitucionService, private dialog: MatDialog, public loginService: LoginService, private coreService: CoreService){}

  getInstitucionList(){
    this.institucion.getInstitucionList().subscribe({
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

  deleteInstitucion(id: number) {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el institución con ID ${id}?`);
  
    if (isConfirmed) {
      this.institucion.deleteInstitucion(id).subscribe({
        next: (res) => {
          this.coreService.openSnackBar('Institución eliminada', 'Aceptar');
          this.getInstitucionList();
        },
        error: (error) => {
          this.coreService.openSnackBar('ERROR', 'Aceptar');
          this.getInstitucionList();
        }
      });
    } else {
      alert('Eliminación cancelada');
    }
  }
  

  editInstitucionForm(data: any) {
    const dialogRef = this.dialog.open(CUInstitucionComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getInstitucionList();
      }
    });
  }

  showOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() !== 'viewer';
  }

  disableOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() === 'viewer';
  }
}
