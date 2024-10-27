import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { IndexViewComponent } from "./views/componentes/index-view/index-view.component";
import { LoginViewComponent } from "./views/manager/login-view/login-view.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routes";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { LoginService } from "./service/login-service/login.service";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    AppComponent,
    IndexViewComponent,
    LoginViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }