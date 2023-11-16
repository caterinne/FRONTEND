import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: any[] = [];

  session: any;

  constructor(private router: Router,private http: HttpClient) {
    let session: any = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    this.session = session;
  }

  login(username: string, password: string, usuarios: any) {
    for (let i = 0; i < usuarios.length; i++){
      this.users.push({
        email: usuarios[i].Email ,
        name: usuarios[i].Nombre,
        lastname: usuarios[i].Apellido,
        username: usuarios[i].Email,
        password: usuarios[i].Contrasena,
        role: usuarios[i].Privilegios
      });
    }

    let user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
      this.users =[]
      return true; // Devuelve verdadero si el inicio de sesión es exitoso.
    }

    return false; // Devuelve falso si las credenciales son incorrectas.
  }

  logout() {
    this.session = undefined;
    localStorage.removeItem('session');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!this.session;
  }

  getSession(): any {
    return this.session;
  }

  // Método para verificar el rol del usuario
  getUserRole(): string | undefined {
    
    return this.session ? this.session.role : undefined;
  }
  getUserName():string | undefined {
    return this.session ? this.session.username : undefined;
  }
}
