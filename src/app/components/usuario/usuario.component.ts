import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/guards/login.service';
import { UsuarioService } from 'src/services/usuario.service';
import { CUUsuarioComponent } from './cu-usuario/cu-usuario.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  displayedColumns: string[] = ['Email','Nombre', 'Apellido', 'Privilegios', 'Action',
];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  usuarioLogeado: any;

  constructor(private usuario: UsuarioService, private dialog: MatDialog, public loginService: LoginService, private coreService: CoreService) {
    this.usuarioLogeado = this.loginService.getSession();
  }

  ngOnInit(): void {
    this.getUsuarioList();
  }

  getUsuarioList() {
    this.usuario.getUsuarioList().subscribe({
      next: (res: any[]) => {
        // Filtrar el usuario logeado
        const usuariosFiltrados = res.filter(usuario => usuario.ID_Usuario !== this.loginService.ID_Usuario);
  
        this.dataSource = new MatTableDataSource(usuariosFiltrados);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  
        console.log(usuariosFiltrados);
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

  deleteUsuario(id: number) {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el usuario con ID ${id}?`);
  
    if (isConfirmed) {
      this.usuario.deleteUsuario(id).subscribe({
        next: (res) => {
          this.coreService.openSnackBar('Usuario eliminado', 'Aceptar');
          this.getUsuarioList();
        },
        error: (error) => {
          this.coreService.openSnackBar('ERROR', 'Aceptar');
          this.getUsuarioList();
        }
      });
    } else {
      alert('Eliminación cancelada');
    }
  }

  editUsuarioForm(data: any) {
    const dialogRef = this.dialog.open(CUUsuarioComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsuarioList();
      }
    });
  }
}
