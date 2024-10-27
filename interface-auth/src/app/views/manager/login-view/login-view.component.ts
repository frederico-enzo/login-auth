import { Component, inject } from '@angular/core';
import { LoginService } from '../../../service/login-service/login.service';
import { Login } from '../../../model/login-model/login';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  loginService = inject(LoginService);
  login: Login = new Login();
  roteador = inject(Router);

  constructor() {
    this.loginService.removeToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: usuario => {localStorage.setItem("token", usuario.token),this.roteador.navigate(['admin/produtos']);
    },
      error: erro => {console.log(erro);
      }
    });

   
  }
}
