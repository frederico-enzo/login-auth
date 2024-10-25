import { RouterModule, Routes } from '@angular/router';
import { IndexViewComponent } from './views/componentes/index-view/index-view.component';
import { LoginViewComponent } from './views/manager/login-view/login-view.component';
import { NgModule } from '@angular/core';
import { RegisterViewComponent } from './views/manager/register-view/register-view.component';
import { rotaGuard } from './guard/rota-guard.guard';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "register", component: RegisterViewComponent },
    { path: "login", component: LoginViewComponent },
    {
      path: "admin", component: IndexViewComponent, canActivate: [rotaGuard], children: [
  
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }