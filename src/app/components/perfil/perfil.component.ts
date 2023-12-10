import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/guards/login.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  user: any;
  showPassword = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.loginService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error("Error al obtener el usuario:", error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  hidePassword(password: string): string {
    return password.replace(/./g, '*');
  }
  verUsuarios(): void {
    this.router.navigate(['/usuario']);
  }
}
