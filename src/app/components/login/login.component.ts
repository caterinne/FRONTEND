import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/guards/login.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  usuarios: any;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private loginService: LoginService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}


  ngOnInit() {
    this.hacerPeticion()
    this.renderer.setStyle(this.document.body, 'background-color', '#253e85');
  }

  imagePath = '../../elements/ori.png';

  Login() {

    let user = this.loginService.login(
      this.form.value.username,
      this.form.value.password,
      this.usuarios,
    );
    if (!user){
      alert('El usuario o la contraseña no son correctos');
    }else{
      this.router.navigateByUrl('/page');
    }
  }
  @HostListener('document:keypress', ['$event']) /* Al presionar ENTER se puede iniciar sesión */
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.Login();
    }
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/';
    this.http.get(url+'usuarios').subscribe((data: any) => {
      this.usuarios = data;
    });
  }
}
