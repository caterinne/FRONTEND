import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: any[] = [];

  session: any;

  ID_Usuario: number | undefined;

  constructor(private router: Router,private http: HttpClient) {
    let session: any = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
      this.ID_Usuario = session.ID_Usuario;
      console.log('ID_Usuario en LoginService:', this.ID_Usuario);
    }
    this.session = session;
  }

  login(username: string, password: string, usuarios: any) {
    for (let i = 0; i < usuarios.length; i++){
      this.users.push({
        ID_Usuario: usuarios[i].ID_Usuario,
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
  
      // Asigna el valor de ID_Usuario
      this.ID_Usuario = user.ID_Usuario;
  
      this.users = []
      return true;
    }
  
    return false;
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
  getUser(): Observable<any> {
    return of(this.session).pipe(
      catchError((error) => {
        console.error("Error al obtener el usuario:", error);
        return of(null);
      })
    );
  }
}
