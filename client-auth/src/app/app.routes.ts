import { Routes } from '@angular/router';
import { SignUpComponent } from './view/system/sign-up/sign-up.component';
import { LogInComponent } from './view/system/log-in/log-in.component';
import { rotaGuard } from './guard/rota-guard.guard';
import { IndexComponent } from './view/componente/index/index.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "register", component: SignUpComponent },
    { path: "login", component: LogInComponent },
    {
      path: "admin", component: IndexComponent, canActivate: [rotaGuard], children: [
      ]
    }
];
