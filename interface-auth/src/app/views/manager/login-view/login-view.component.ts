import { Component, inject } from '@angular/core';
import { LoginService } from '../../../service/login-service/login.service';
import { Login } from '../../../model/login-model/login';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../../app.routes';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  login: Login = new Login();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  
  logar() {
    this.loginService.logar(this.login).subscribe({
      next: usuario => {
        localStorage.setItem("token", usuario.token), this.router.navigate(['admin/']);
      },
      error: erro => {
        console.log(erro);
      }
    });
  }
}
