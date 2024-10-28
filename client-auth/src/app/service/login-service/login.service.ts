import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../model/login-model/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user-model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API: string = "http://localhost:8080/api"
  http = inject(HttpClient);

  constructor() { }
  logar(login: Login): Observable<User> {
    return this.http.post<User>(`${this.API}/logar`, login);
  }

  registrar(user: User): Observable<User> {
    return this.http.post<User>(`${this.API}/registrar`, user);
  }

  deslogar(login: Login): Observable<any> {
    return this.http.get<any>(this.API + "/deslogar")
  }

  addToken(token: string){
    localStorage.setItem("token", token);
  }

  removeToken(){
    localStorage.removeItem("token");
  }

  getToken(){
    return localStorage.getItem("token");
  }

  hasPermission(role: string){
    if(role == "ADMIN"){
      return true;
    } else{
      return false;
    }
  }
}