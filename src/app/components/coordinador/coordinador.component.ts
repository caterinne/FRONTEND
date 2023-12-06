import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoordinadorService } from 'src/services/coordinador.service';
import { CUCoordinadorComponent } from './cu-coordinador/cu-coordinador.component';
import { LoginService } from 'src/guards/login.service';

@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.scss']
})
export class CoordinadorComponent {
  displayedColumns: string[] = ['ID_Institucion','Nombre', 'Correo','Tipo_Coordinador', 'Action', 

];
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getCoordinadorList();
  }
  constructor(private coordinador: CoordinadorService, private dialog: MatDialog, public loginService: LoginService){}

  getCoordinadorList(){
    this.coordinador.getCoordinadorList().subscribe({
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

  deleteCoordinador(id: number) {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el Coordinador con ID ${id}?`);
  
    if (isConfirmed) {
      this.coordinador.deleteCoordinador(id).subscribe({
        next: (res) => {
          alert('Coordinador Eliminado');
          this.getCoordinadorList();
        },
        error: (error) => {
          alert('Coordinador Eliminado');
          this.getCoordinadorList();
        }
      });
    } else {
      alert('Eliminación cancelada');
    }
  }
  

  editInstitucionForm(data: any) {
    const dialogRef = this.dialog.open(CUCoordinadorComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCoordinadorList();
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
